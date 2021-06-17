import {Alert, Button, Card, Row} from 'react-bootstrap';
import {Form as BForm} from 'react-bootstrap';
import { ErrorMessage, Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import React, { useEffect, useState } from 'react';
import { IUserRole } from 'src/lib/types/data/userRole.type';
import SimpleMap from '../map/SimpleMap';
import { capitalizeString } from 'src/lib/utilityFunctions';
import { findSegmentByName, findSubsegmentsBySegmentId } from 'src/lib/api/segmentRoutes';
import { ISegment, ISubSegment } from 'src/lib/types/data/segment.type';
import * as Yup from 'yup';
import Stepper from 'react-stepper-horizontal';
import '../../../src/scss/ui/_other.scss';
import { IFetchError } from '../../lib/types/types';
import { searchForLocation } from 'src/lib/api/googleMapQuery';
interface RegisterPageContentProps {
    userRoles: IUserRole[] | undefined;
}

export const RegisterPageContent: React.FC<RegisterPageContentProps> = ({userRoles}) => {
    const [markers, sendData]:any = useState({home: {lat: null, lon: null},work: {lat: null, lon: null},school: {lat: null, lon: null}});
    const [map, showMap] = useState(false);
    const [segment, setSegment] = useState<ISegment>();
    const [subSegments, setSubSegments] = useState<ISubSegment[]>();
    const [subIds, setSubIds] = useState<number[]>([]);
    const selectString:string = "Select your Neighbourhood (optional)";
    //These two useState vars set if the values should be transferred from the one to the other before the form submits.
    //Used with the radio buttons.
    const [workTransfer, transferHomeToWork] = useState(false);
    const [schoolTransfer, transferWorkToSchool] = useState(false);
    const refactorSubIds = (index: number, subId: number) => {
        console.log('called');
        let ids = [...subIds];
        ids[index] = subId;
        setSubIds(ids);
    }
    useEffect(()=>{
        //This allows the first click on the map to update the markers variables in the step handler functions.
    },[markers])
return (
    <div className='register-page-content'>
            <FormikStepper initialValues={{
                userRoleId: 2,
                email: '',
                password: '',
                confirmPassword: '',
                fname: '',
                lname: '',
                address: {
                    streetAddress: '',
                    streetAddress2: '',
                    city: '',
                    postalCode: '',
                    country: '',
                },
                geo: {
                    lon: null,
                    lat: null,
                    work_lat: null,
                    work_lon: null,
                    school_lat: null,
                    school_lon: null,
                },
                homeSegmentId: null,
                workSegmentId: null,
                schoolSegmentId: null,
                homeSubSegmentId: null,
                workSubSegmentId: null,
                schoolSubSegmentId: null,
                
            }}  markers={markers}
                setSegment={setSegment}
                setSubSegments={setSubSegments}
                setSubIds={setSubIds}
                showMap={showMap}
                subIds={subIds}
                workTransfer={workTransfer}
                schoolTransfer={schoolTransfer}
                onSubmit={(values,helpers)=>{
                    console.log(values);
                }}
            >
                <FormikStep validationSchema={Yup.object().shape({
                    password: Yup.string().min(8, 'Password is too short, 8 characters minimum'),
                    confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')})}>
                    <h1>Create An Account</h1>
                    <BForm.Label>Email address</BForm.Label> 
                    <Field required name="email" type="email" as={BForm.Control}/>
                    <BForm.Label>Password</BForm.Label>
                    <Field required name="password" type="password" as={BForm.Control}/>
                    <ErrorMessage name="password">{msg => <p className="text-danger">{msg}<br></br></p>}</ErrorMessage>
                    <BForm.Label>Confirm Password</BForm.Label>
                    <Field required name="confirmPassword" type="password" as={BForm.Control}/>
                    <ErrorMessage name="confirmPassword">{msg => <p className="text-danger">{msg}<br></br></p>}</ErrorMessage>
                    <BForm.Label>First Name</BForm.Label>
                    <Field required name="fname" type="text" as={BForm.Control}/>
                    <BForm.Label>Last Name</BForm.Label>
                    <Field required name="lname" type="text" as={BForm.Control}/>
                    <BForm.Label>Zip / Postal Code</BForm.Label>
                    <Field required name="address.streetAddress" type="text" as={BForm.Control}/>
                    <BForm.Label>Street Name</BForm.Label>
                    <Field name="address.postalCode" type="text" as={BForm.Control}/>
                </FormikStep>

                <FormikStep>
                    <Card.Title>Show us on the map where your home is</Card.Title>
                    <Card.Subtitle className="text-muted mb-3">We use this information to find your community!</Card.Subtitle>
                    <SimpleMap iconName={'home'} sendData={(markers:any)=>sendData(markers) } />
                </FormikStep>

                <FormikStep >
                    <BForm.Label>Your Home Municipality is</BForm.Label>
                    <BForm.Control readOnly name="homeSegName" defaultValue={segment?.name}></BForm.Control>
                    <BForm.Label></BForm.Label>
                    <BForm.Control name="homeSubName" as="select" onChange={(e)=>{refactorSubIds(0,parseInt(e.target.value))}}>
                        <option hidden>{selectString}</option>
                        {subSegments?.map(subSeg=>(<option key={subSeg.id} value={subSeg.id}>{subSeg.name}</option>))};
                    </BForm.Control>
                </FormikStep>

                <FormikStep >
                    {!map 
                    ?   <div>
                        <Card.Title>Do you work in a different municipality or neighbourhood? 
                        <div className="float-right">
                        <BForm.Check inline label="yes" name="group1" type="radio" id="inline-checkbox" onClick={()=>{showMap(true); transferHomeToWork(false)}}/>
                        <BForm.Check inline label="no" name="group1" type="radio" id="inline-checkbox" onClick={()=>{transferHomeToWork(true)}}/>
                        </div>
                        </Card.Title>
                        {!workTransfer&&<Card.Subtitle className="mb-4 text-next">Press Next to skip!</Card.Subtitle>}
                        </div>
                    :
                    <><Card.Title>Show us on the map where your work is (optional)</Card.Title>
                    <SimpleMap iconName={'work'} sendData={(markers:any)=>sendData(markers) } /></>}
                </FormikStep>

                <FormikStep>
                    <BForm.Label>Your Work Municipality is</BForm.Label>
                    <BForm.Control readOnly name="workSegName" defaultValue={segment?.name}></BForm.Control>
                    <BForm.Label></BForm.Label>
                    <BForm.Control name="workSubName" as="select" onChange={(e)=>{refactorSubIds(1,parseInt(e.target.value))}}>
                        <option hidden>{selectString}</option>
                    {subSegments?.map(subSeg=>(<option key={subSeg.id} value={subSeg.id}>{subSeg.name}</option>))};
                    </BForm.Control>
                </FormikStep>

                <FormikStep >
                    {!map 
                    ?   <div>
                        <Card.Title className="mb-4">Do you study in a different municipality or neighbourhood? 
                        <div className="float-right">
                        <BForm.Check inline label="yes" name="group1" type="radio" id="inline-checkbox" onClick={()=>{showMap(true); transferWorkToSchool(false)}}/>
                        <BForm.Check inline label="no" name="group1" type="radio" id="inline-checkbox" onClick={()=>{transferWorkToSchool(true)}}/>
                        </div>
                        </Card.Title>
                        {!schoolTransfer&&<Card.Subtitle className="mb-4 text-next">Press Next to skip!</Card.Subtitle>}
                        </div>
                    :
                    <><Card.Title>Show us on the map where your school is (optional)</Card.Title>
                    <SimpleMap iconName={'school'} sendData={(markers:any)=>sendData(markers) } /></>}
                </FormikStep>

                <FormikStep>
                    <BForm.Label>Your School Municipality is</BForm.Label>
                    <BForm.Control readOnly name="schoolSegName" defaultValue={segment?.name}></BForm.Control>
                    <BForm.Label></BForm.Label>
                    <BForm.Control name="schoolSubName" as="select" onChange={(e)=>{refactorSubIds(2,parseInt(e.target.value))}}>
                    <option hidden>{selectString}</option>
                    {subSegments?.map(subSeg=>(<option key={subSeg.id} value={subSeg.id}>{subSeg.name}</option>))};
                    </BForm.Control>
                </FormikStep>

                <FormikStep>
                    <div className="text-center">
                    <h3 className="mb-4">Press submit to complete registration!</h3>
                    {/* <Image width='50%' src='/banner/MyLivingCity_Logo_Name-Tagline.png' className="mb-2"/> */}
                    </div>

                </FormikStep>

            </FormikStepper>

    </div>
    
);
}



export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema' > {
    setSegmentId?: any;
}

export function FormikStep({ children }: FormikStepProps) {
    return <>{children}</>;
}
export interface FormikStepperProps extends FormikConfig<FormikValues> {
    markers: any;
    setSegment: any;
    setSubSegments: any;
    showMap: any;
    setSubIds: any;
    subIds: any;
    workTransfer: boolean;
    schoolTransfer: boolean;
}
export function FormikStepper({ children, markers, showMap, subIds,schoolTransfer, workTransfer, ...props }: FormikStepperProps) {
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const [step, setStep] = useState(0);
    const [inferStep, setInferStep]=useState(0);
    const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>;
    const [isLoading, setIsLoading] = useState(false);
    const [segIds, setSegIds] = useState<number[]>([]);
    const [error, setError] = useState<IFetchError | null>(null);
    //Functions for handling button states.
    const isLastStep = () => { return step === childrenArray.length - 1 };
    const nextOrLoading = () => { return isLoading ? 'Loading...' : 'Next' };
    const submitOrSubmitting = () => { return isLoading ? 'Submitting...':'Submit' };
    const isHomeMarkerSet = () => { return (step===1 && markers.home.lat === null) };

    const isWorkSubIdSet = () => { 
        if(subIds[1]) return subIds[1] 
        else return subIds[0];
    }
    const isWorkSegIdSet = () => { 
        if(segIds[1]) return segIds[1] 
        else return segIds[0];
    }
    //Handles the refactoring of the state segIds array.
    const refactorSegIds = (index: number, segId: number) => {
        let ids = [...segIds];
        ids[index] = segId;
        setSegIds(ids);
    }
    //This handles the step and inferStep state variables.
    //Step keeps track of the current child to display.
    //InferStep keeps track of the step icons.
    //Since some steps will have multiple "steps" the infer step decreases dependant on if map selections have occured.
    const handleBackButton = () => {
        if(step % 2 !== 0){
            setInferStep(s=>s-1);
        } 
        if(step===7 && markers.school.lat === null){
            setStep(s=>s-2);
        }else if(step === 5 && markers.work.lat === null){
            setStep(s=>s-2);
        }else{
            setStep(s=>s-1);
        }
    }
    //This function calls the google api to receive data on the map location
    //The data is then searched in the back end for a matching segment
    //Then the back end is searched for all the sub-segments of that matching segment.
    async function setSegData(index: number){
        let googleQuery:any;
        try{
            //PLACEHOLDER for GOOGLE API query
            setError(null);
            setIsLoading(true);
            switch(index){
                case 0:
                    googleQuery = await searchForLocation(markers.home);
                    console.log('google home query');
                break;
                case 1:
                    googleQuery = await searchForLocation(markers.work);
                    console.log('google work query');
                break;
                case 2:
                    googleQuery = await searchForLocation(markers.school);
                    console.log('google school query');
                break;
                default:
            }
            console.log(googleQuery);
            if(googleQuery.cities){
                const seg = await findSegmentByName({segName:googleQuery.city, province:googleQuery.province, country:googleQuery.country});
                const sub = await findSubsegmentsBySegmentId(seg.segId);
                props.setSegment(seg);
                props.setSubSegments(sub);
                refactorSegIds(index, seg.segId);
                // if(googleQuery.city2){
                //     const seg = await findSegmentByName({segName:googleQuery.city2, province:googleQuery.province, country:googleQuery.country});
                //     const sub = await findSubsegmentsBySegmentId(seg.segId);
                //     props.setSegment(seg);
                //     props.setSubSegments(sub);
                //     refactorSegIds(index, seg.segId);
                // }
            }

            //Temp vars for testing
            // googleQuery = await searchForLocation(markers.home);
            // console.log(googleQuery);
            // const seg = await findSegmentByName({segName:'victoria', province:'british columbia', country:'canada' });
            // const sub = await findSubsegmentsBySegmentId(seg.segId);
            // let ids = [...subIds];
            // ids[index] = sub[0].id;
            props.setSubIds(subIds);
            setStep(s=>s+1);
        }catch(err){
            setError(new Error(err.response.data));
        }
    }
return(
    <Formik
    {...props}
    validationSchema={currentChild?.props.validationSchema}
    onSubmit={async(values, helpers)=>{

        if(step === childrenArray.length -1){
            setIsLoading(true);
            await new Promise(r => setTimeout(r, 2000));
            await props.onSubmit(values, helpers);
            
        }else if(step=== 1){
            const seg = await setSegData(0);
            showMap(false);
        }else if(step=== 3){
            
            if(markers.work.lat === null){
                setStep(s=>s+2);
                setInferStep(s=>s+1);
                if(workTransfer){
                    refactorSegIds(1, segIds[0]);
                }
            }else{
                const seg = await setSegData(1);
                //setStep(s=>s+1);
            }
            showMap(false);
        }else if(step=== 5){
            if(markers.school.lat === null){
                setStep(s=>s+2);
                setInferStep(s=>s+1);
                if(schoolTransfer){
                    refactorSegIds(2, segIds[1] || segIds[0]);
                }
            }else{
                const seg = await setSegData(2);
                //setStep(s=>s+1);
            }
            //Field setters for the external inputs. Formik can only handle native form elements.
            //These fields must be added manually.
            helpers.setFieldValue('geo.lat', markers.home.lat);
            helpers.setFieldValue('geo.lon', markers.home.lon);
            helpers.setFieldValue('geo.work_lat', markers.work.lat);
            helpers.setFieldValue('geo.work_lon', markers.work.lon);
            helpers.setFieldValue('geo.school_lat', markers.school.lat);
            helpers.setFieldValue('geo.school_lon', markers.school.lon);

            helpers.setFieldValue('homeSubSegmentId', subIds[0] || null);
            helpers.setFieldValue('workSubSegmentId', subIds[1] || workTransfer ? subIds[0] : null);
            

            helpers.setFieldValue('homeSegmentId', segIds[0]);
            helpers.setFieldValue('workSegmentId', segIds[1] || null);
            
        }else{
            setStep(s=>s+1);
            setInferStep(s=>s+1);
            //helpers.setTouched({});
        }
        //These fields added here due to update reasons. If these fields are in the above section the state is not updated. Due to setFieldValue being async.
        helpers.setFieldValue('schoolSubSegmentId', subIds[2] || schoolTransfer ? isWorkSubIdSet() : null);
        helpers.setFieldValue('schoolSegmentId', segIds[2] || null);
        setIsLoading(false);
    }}
    >
    <div>
    <div className="stepper mb-4">
    <Stepper steps={ [
        {title: 'Account Info'}, 
        {title: 'Home Location'}, 
        {title: 'Work Location'},
        {title: 'School Location'},
        {title: 'Submit'}] } 
        activeStep={ inferStep }
        circleTop={0}
        lineMarginOffset={8}
        activeColor={'#98cc74'}
        activeTitleColor={'#98cc74'}
        completeColor={"#98cc74"}/>
    </div>
    <Card>
    <Card.Body>   
    <Form>
        {currentChild}
        {error && (<Alert variant='danger' className="error-alert">{ error.message }</Alert>)}
        <div className="text-center">
        {step > 0 ? <Button className="float-left mt-3" size="lg" variant="outline-primary" onClick={()=>{handleBackButton()}}>Back</Button> : null}
        <Button className="float-right mt-3" size="lg" type="submit" disabled={isLoading||isHomeMarkerSet()}>{isLastStep() ? submitOrSubmitting() : nextOrLoading()}</Button>
        </div>

    </Form>
    </Card.Body>
    </Card>
    </div>
    </Formik>
)
}
export default RegisterPageContent