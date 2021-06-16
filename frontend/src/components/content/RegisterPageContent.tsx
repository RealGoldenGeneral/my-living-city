import {Button, Card, Row} from 'react-bootstrap';
import {Form as BForm, Image} from 'react-bootstrap';
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
interface RegisterPageContentProps {
    userRoles: IUserRole[] | undefined;
}

export const RegisterPageContent: React.FC<RegisterPageContentProps> = ({userRoles}) => {
    const [markers, sendData]:any = useState({home: {lat: null, lon: null},work: {lat: null, lon: null},school: {lat: null, lon: null}});
    const [map, showMap] = useState(false);
    const [segment, setSegment] = useState<ISegment>();
    const [subSegments, setSubSegments] = useState<ISubSegment[]>();
    const [subIds, setSubIds] = useState<number[]>([]);
    const refactorSubIds = (index: number, segId: number) => {
        let ids = [...subIds];
        ids[index] = segId;
        setSubIds(subIds);
    }
    useEffect(()=>{

    },[markers])
return (
    <div className='register-page-content'>
            <FormikStepper initialValues={{
                userRoleId: 0,
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
                    <BForm.Label>Select your Neighbourhood</BForm.Label>
                    <BForm.Control name="homeSubName" as="select" onChange={(e)=>{refactorSubIds(0,parseInt(e.target.value))}}>
                        {subSegments?.map(subSeg=>(<option key={subSeg.id} value={subSeg.id}>{subSeg.name}</option>))};
                        <option>Test</option>
                    </BForm.Control>
                </FormikStep>

                <FormikStep >
                    {!map 
                    ?
                        <Card.Title className="mb-4">Do you work in a different municipality or neighbourhood? 
                        <div className="float-right">
                        <BForm.Check inline label="yes" name="group1" type="radio" id="inline-checkbox" onClick={()=>{showMap(true)}}/>
                        <BForm.Check inline label="no" name="group1" type="radio" id="inline-checkbox"/>
                        </div>
                        </Card.Title> 
                    :
                    <><Card.Title>Show us on the map where your work is (optional)</Card.Title>
                    <SimpleMap iconName={'work'} sendData={(markers:any)=>sendData(markers) } /></>}
                </FormikStep>

                <FormikStep>
                    <BForm.Label>Your Work Municipality is</BForm.Label>
                    <BForm.Control readOnly name="workSegName" defaultValue={segment?.name}></BForm.Control>
                    <BForm.Label>Select your Neighbourhood</BForm.Label>
                    <BForm.Control name="workSubName" as="select" onChange={(e)=>{refactorSubIds(1,parseInt(e.target.value))}}>
                    {subSegments?.map(subSeg=>(<option key={subSeg.id} value={subSeg.id}>{subSeg.name}</option>))};
                    </BForm.Control>
                </FormikStep>

                <FormikStep >
                    {!map 
                    ?
                        <Card.Title className="mb-4">Do you study in a different municipality or neighbourhood? 
                        <div className="float-right">
                        <BForm.Check inline label="yes" name="group1" type="radio" id="inline-checkbox" onClick={()=>{showMap(true)}}/>
                        <BForm.Check inline label="no" name="group1" type="radio" id="inline-checkbox"/>
                        </div>
                        </Card.Title> 
                    :
                    <><Card.Title>Show us on the map where your school is (optional)</Card.Title>
                    <SimpleMap iconName={'work'} sendData={(markers:any)=>sendData(markers) } /></>}
                </FormikStep>

                <FormikStep>
                    <BForm.Label>Your School Municipality is</BForm.Label>
                    <BForm.Control readOnly name="schoolSegName" defaultValue={segment?.name}></BForm.Control>
                    <BForm.Label>Select your Neighbourhood</BForm.Label>
                    <BForm.Control name="schoolSubName" as="select" onChange={(e)=>{refactorSubIds(2,parseInt(e.target.value))}}>
                    {subSegments?.map(subSeg=>(<option key={subSeg.id} value={subSeg.id}>{subSeg.name}</option>))};
                    </BForm.Control>
                </FormikStep>

                <FormikStep>
                    <div className="text-center">
                    <h3 className="mb-4">Registration Complete!</h3>
                    <Image width='50%' src='/banner/MyLivingCity_Logo_Name-Tagline.png' className="mb-2"/>
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
}
export function FormikStepper({ children, markers, showMap, subIds, ...props }: FormikStepperProps) {
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const [step, setStep] = useState(0);
    const [inferStep, setInferStep]=useState(0);
    const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>;
    const [isLoading, setIsLoading] = useState(false);
    const [disableNext, setDisableNext] = useState(false);
    const isLastStep = () => { return step === childrenArray.length - 1 };
    const nextOrLoading = () =>{ return isLoading ? 'Loading...' : 'Next' };
    const submitOrSubmitting = () =>{ return isLoading ? 'Submitting...':'Submit' };
    console.log(step);
    useEffect(()=>{
        setDisableNext(false);
    },[markers])
    async function setSegData(index: number){
        try{
            //PLACEHOLDER for GOOGLE API query
            console.log(markers);
            const seg = await findSegmentByName({segName:'victoria', province:'british columbia', country:'canada' });
            const sub = await findSubsegmentsBySegmentId(seg.segId);
            props.setSegment(seg);
            props.setSubSegments(sub);
            let ids = [...subIds];
            ids[index] = sub[0].id;
            props.setSubIds(ids);
            return seg;
        }catch(err){
            console.log(err);
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
            console.log('hello');
            await props.onSubmit(values, helpers);
            setIsLoading(false);
        }else if(step=== 1){
            setIsLoading(true);
            const seg = await setSegData(0);
            helpers.setFieldValue('homeSegmentId', seg.segId);
            setIsLoading(false);
            setStep(s=>s+1);
            showMap(false);
        }else if(step=== 3){
            
            if(markers.work.lat === null){
                setStep(s=>s+2);
                setInferStep(s=>s+1);
            }else{
                setIsLoading(true);
                const seg = await setSegData(1);
                helpers.setFieldValue('workSegmentId', seg.segId);
                setIsLoading(false);
                setStep(s=>s+1);
            }
            showMap(false);
        }else if(step=== 5){
            if(markers.school.lat === null){
                setStep(s=>s+2);
                setInferStep(s=>s+1);
            }else{
                setIsLoading(true);
                const seg = await setSegData(2);
                helpers.setFieldValue('schoolSegmentId', seg.segId);
                setStep(s=>s+1);
            }


            //Setters for the external input fields.
            helpers.setFieldValue('geo.lat', markers.home.lat);
            helpers.setFieldValue('geo.lon', markers.home.lon);
            helpers.setFieldValue('geo.work_lat', markers.work.lat);
            helpers.setFieldValue('geo.work_lon', markers.work.lon);
            helpers.setFieldValue('geo.school_lat', markers.work.lat);
            helpers.setFieldValue('geo.school_lon', markers.work.lon);

            helpers.setFieldValue('homeSubSegmentId', subIds[0]);
            helpers.setFieldValue('workSubSegmentId', subIds[1]);
            helpers.setFieldValue('schoolSubSegmentId', subIds[2]);
            setIsLoading(false);
        }else{
            setStep(s=>s+1);
            setInferStep(s=>s+1);
            //helpers.setTouched({});
        }
        // helpers.setTouched({});
    }}
    >
    <div>
    <div className="stepper mb-4">
    <Stepper steps={ [
        {title: 'Account Info'}, 
        {title: 'Home Location'}, 
        {title: 'Work Location'},
        {title: 'School Location'},
        {title: 'Register'}] } 
        activeStep={ inferStep }
        circleTop={0}
        lineMarginOffset={8}
        activeColor={'#98cc74'}
        completeColor={"#98cc74"}/>
    </div>
    <Card>
    <Card.Body>   
    <Form>
        {currentChild}
        <div className="text-center">
        {step > 0 ? <Button className="float-left mt-3" size="lg" variant="outline-primary" onClick={()=>{setStep(s=>s-1)}}>Back</Button> : null}
        <Button className="float-right mt-3" size="lg" type="submit" disabled={isLoading||disableNext}>{isLastStep() ? submitOrSubmitting() : nextOrLoading()}</Button>
        </div>

    </Form>
    </Card.Body>
    </Card>
    </div>
    </Formik>
)
}
export default RegisterPageContent