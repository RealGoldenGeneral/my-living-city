import React, { useContext, useState } from 'react'
import { ProgressBar, Form, Button, Alert, Card} from 'react-bootstrap'
import { useFormik } from 'formik'
import { UserProfileContext } from '../../contexts/UserProfile.Context';
import { IFetchError } from '../../lib/types/types';
import { capitalizeString, handlePotentialAxiosError, storeTokenExpiryInLocalStorage, storeUserAndTokenInLocalStorage, wipeLocalStorage } from '../../lib/utilityFunctions';
import { IRegisterInput } from '../../lib/types/input/register.input';
import { IUserRole } from '../../lib/types/data/userRole.type';
import { postRegisterUser } from '../../lib/api/userRoutes';
import SimpleMap from '../map/SimpleMap';
import { postAvatarImage } from '../../lib/api/avatarRoutes';
import { ISegment, ISubSegment } from 'src/lib/types/data/segment.type';
//import SelectSegmentPage from 'src/pages/SelectSegmentPage';
import { searchForLocation } from 'src/lib/api/googleMapQuery';
import { useAllSubSegmentsWithId } from 'src/hooks/segmentHooks';
import { findSegmentByName } from 'src/lib/api/segmentRoutes';


interface SegmentsDropdownProps {
  segments: ISegment[] | undefined;
  name: string;
}

export const SegmentsDropdown: React.FC<SegmentsDropdownProps> = ({segments, name}) => {
    return (   
      <>   
    <Form.Group controlId="registerUserSegment">
    <Form.Label>Select your Municipality</Form.Label>
    <Form.Control
      as="select"
      name="segment"
    >
      {segments && segments.map(segment => (
        <option
          key={segment.segId}
          value={segment.name}
          style={{
            textTransform: 'capitalize'
          }}
        >
          {capitalizeString(segment.name)}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
<Form.Group controlId="registerUserSubSegment">
    <Form.Label>Select your Neighbourhood</Form.Label>
    <Form.Control
      as="select"
      name="sub-segment"
    >
      {/* {userRoles && userRoles.map(role => (
        <option
          key={String(role.id)}
          value={Number(role.id)}
          style={{
            textTransform: 'capitalize'
          }}
        >
          {capitalizeString(role.name)}
        </option>
      ))} */}
    </Form.Control>
    <Button variant="link">Don't see your Municipality or Neighbourhood? 
    Click here to request it in our system!</Button>
  </Form.Group>
  
  </>
  );
};
interface RegisterPageContentProps {
  userRoles: IUserRole[] | undefined;
}
const RegisterPageContent: React.FC<RegisterPageContentProps> = ({ userRoles }) => {
  const {
    setToken,
    setUser,
    //user
  } = useContext(UserProfileContext);
  let [show, setShow] = useState(1);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [showMap, setShowMap] = useState(true);
  //Buttons for page navigation
  const next = <Button className="float-right mt-2" size="lg" onClick={()=>{
    setShow(show=show+1);
    setShowMap(false);
  }} disabled={nextDisabled}>Next</Button>;
  const prev = <Button className="float-left mt-2" size="lg" variant="outline-primary"onClick={()=>{setShow(show=show-1)}}>Previous</Button>;
  const register = <Button type="submit" size="lg" onClick={()=>{customFormikSet(); 
      submitHandler(formik.values)}} className="float-right mt-1">Register!</Button>;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IFetchError | null>(null);
  //const [iconName, setIcon] = useState("home");
  const [selectedFile, setSelectedFile] = useState(undefined);
  //let segmentList: string[] = [];
  const [segmentList, setSegmentList] = useState([]);
  const [markers, sendData]:any = useState({
    home: {lat: null, lon: null},
    work: {lat: null, lon: null},
    school: {lat: null, lon: null}
  });
  interface NextMapProps {
    name: string;
}
  const NextMap: React.FC<NextMapProps> = ({name}) => {
    //const [count, setCount]=useState(0);
    // async function handleConfirmLocation (coords: any) {
    //   try{
    //     const{country, province, cities} = await searchForLocation(coords);
    //     //segmentList = cities;
    //     setSegmentList(cities);
    //     setShowDropdown(true);
    //   }catch(err){
    //     console.log(err);
    //   }
    // }
    const handleConfirmLocation = async (coords: any) => {
      try{
        //Search for loaction will return country, city and province, error will be thrown if no location found
        //const queryResult = await searchForLocation(coords);
        //const subSegments = await findSegmentByName(queryResult.city,queryResult.province,queryResult.country);
        const segments = await findSegmentByName({segName:'victoria', province:'british columbia', country:'canada' });
        console.log(segments);
        return segments
      }catch(error){
        console.log(error);
      }
    }

    if(markers.home.lon || markers.home.lat){
      setNextDisabled(false);
    }
    let title: any;
    if(name==="home"){
      setShowMap(true);
      title = <>
      <Card.Title>Show us on the map where your {name} is</Card.Title>
      <Card.Subtitle className="text-muted mb-3">We use this information to find your community!</Card.Subtitle>
      </>
    } 
    if(name==="work"){
      title = <>
        {!showMap ?<Card.Title>Do you {name} in a different municipality or neighbourhood? 
          <Button variant="outline-primary" onClick={()=>{setShowMap(true)}}>Yes</Button>{' '}
          <Button onClick={()=>{setShow(show=show+2)}}>No</Button></Card.Title>:
          <><Card.Title>Show us on the map where your {name} is</Card.Title>
          <Card.Subtitle className="text-muted mb-3">We use this information to find your community!</Card.Subtitle></>
          } 
        </>
    } 
    if(name==="school") {
      title = <>
      {!showMap ?<Card.Title>Do you study in a different municipality or neighbourhood? 
      <Button variant="outline-primary" onClick={()=>{setShowMap(true)}}>Yes</Button>{' '}
      <Button onClick={()=>{setShow(show=show+2)}}>No</Button></Card.Title>:
      <><Card.Title>Show us on the map where your {name} is</Card.Title>
      <Card.Subtitle className="text-muted mb-3">We use this information to find your community!</Card.Subtitle></>
      } 
      </>
    } 
    return(
      <>
        {title}
        {showMap && <SimpleMap iconName={name} sendData={(markers:any)=>sendData(markers) } />}
      </>

    )
  }
        {/* {(show === 2 || show === 4 || show === 6) && <><SegmentsDropdown segments={segmentList}/></>} */}
        {/* {(markers.home.lat && markers.home.lon) && <Button className="m-1" variant="outline-primary"onClick={(e)=>{handleConfirmLocation(markers.home)}}>View Communities!</Button>} */}
        {/* <SelectSegmentPage googleSegments={segmentList}/> */}
  //function handleChange(e:any){setIcon(e.target.value);}

  

  function customFormikSet(){
    if(markers.home.lat!=null){
      formik.setFieldValue("geo.lat",markers["home"].lat);
      formik.setFieldValue("geo.lon",markers["home"].lon );
      formik.setFieldValue("geo.work_lat",markers["work"].lat );
      formik.setFieldValue("geo.work_lon",markers["work"].lon );
      formik.setFieldValue("geo.school_lat",markers["school"].lat );
      formik.setFieldValue("geo.school_lon",markers["school"].lon );
      //formik.setFieldValue("image",selectedFile);
    }

  }
  
  const submitHandler = async (values: IRegisterInput) => {
    try {
      // Set loading 
      setError(null);
      setShow(1);
      if(markers.home.lat===null){
        setError(new Error("Please enter your home location."))
        throw error;
      }
      setIsLoading(true);
      const { token, user } = await postRegisterUser(values);
      storeUserAndTokenInLocalStorage(token, user);
      storeTokenExpiryInLocalStorage();
      setToken(token);
      setUser(user);
      await postAvatarImage(selectedFile, token);
      

      // remove previous errors
      setError(null);
      formik.resetForm();
    } catch (error) {
      const genericMessage = 'An error occured while trying to create a new account.';
      const errorObj = handlePotentialAxiosError(genericMessage, error);
      setError(errorObj);
      wipeLocalStorage();
    } finally {
      setIsLoading(false);
    }
  }
  const formik = useFormik<IRegisterInput>({
    initialValues: {
      userRoleId: userRoles ? userRoles[0].id : undefined,
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
        lon: undefined,
        lat: undefined,
        work_lat: undefined,
        work_lon: undefined,
        school_lat: undefined,
        school_lon: undefined,
      }
    },
    
    onSubmit: submitHandler
  })
  if(show === 0){
    return (
      
      <main className='register-page-content'>
          <Card>
            <Card.Header>Step 1</Card.Header>
            <Card.Body>
              <h1>Create An Account</h1>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    placeholder="name@example.com"
                  />
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="fname"
                    onChange={formik.handleChange}
                    value={formik.values.fname}
                  />
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="lname"
                    onChange={formik.handleChange}
                    value={formik.values.lname}
                  />
                </Form.Group>
                <Form.Group controlId="registerAddress">
                  <Form.Label>Zip / Postal Code</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="address.postalCode"
                    onChange={formik.handleChange}
                    value={formik.values.address?.postalCode}
                  />
                </Form.Group>
                <Form.Group controlId="registerAddress">
                  <Form.Label>Street Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="address.streetAddress"
                    onChange={formik.handleChange}
                    value={formik.values.address?.streetAddress}
                  />
                </Form.Group>
                
                  {/* <Form.Group controlId="registerUserLocation">
                  <Form.Label>Enter your where you are located</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={handleChange}>
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="school">School</option>
                  </Form.Control>
                  </Form.Group>
                  <Form.Group>
                      <SimpleMap iconName={iconName} sendData={(markers:any)=>sendData(markers) } />
                  </Form.Group> */}
                  <Form.Group controlId="registerUserType">
                  <Form.Label>Choose your desired account type:</Form.Label>
                  <Form.Control
                    as="select"
                    name="userRoleId"
                    onChange={formik.handleChange}
                    value={formik.values.userRoleId}
                  >
                    {userRoles && userRoles.map(role => (
                      <option
                        key={String(role.id)}
                        value={Number(role.id)}
                        style={{
                          textTransform: 'capitalize'
                        }}
                      >
                        {capitalizeString(role.name)}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="avatarImage">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    //onChange={(e:any)=> formik.setFieldValue("image", e.target.files[0])}
                    onChange={(e:any)=> setSelectedFile(e.target.files[0])}
  
                    //onChange={(picture) => {formik.setFieldValue('image',picture)}}
                  />
                  </Form.Group>
                <Button
                  block
                  //onClick={()=>{customFormikSet()}}
                  //onClick={()=>{setShow(1)}}
                  type='submit'
                  disabled={(isLoading) ? true : false}
                >
                  Next
                </Button>
              </Form>
              {error && (
                <Alert variant='danger' className="error-alert">
                  { error.message}
                </Alert>
              )}
            </Card.Body>
          </Card>
      </main>
    )
  }
  if(show === 1){
    return(
      <main className='register-page-content'>
        <Card>
          <Card.Header>Step {show+1}/8</Card.Header>
            <Card.Body>
              <NextMap name="home"/>
              <div className="text-center">
                {next}
                {prev}
              </div>
          </Card.Body>
        </Card>
      </main>
    )
  }
  if(show === 2){
    return(
      <main className='register-page-content'>
      <Card>
      <Card.Header>Step {show+1}/8</Card.Header>
      <Card.Body>
      <SegmentsDropdown segments={segmentList} name={"home"}/>
      <div className="text-center">
        {next}
        {prev}
        </div>
        </Card.Body>
    </Card>
    </main>
    )
  }
  if(show === 3){
    return(
      <main className='register-page-content'>
      <Card>
      <Card.Header>Step {show+1}/8</Card.Header>
      <Card.Body>
      <NextMap name="work"/>
      <div className="text-center">
        {next}
        {prev}
        </div>
        </Card.Body>
    </Card>
    </main>
    )
  }
  if(show === 4){
    return(
      <main className='register-page-content'>
      <Card>
      <Card.Header>Step {show+1}/8</Card.Header>
      <Card.Body>
      <SegmentsDropdown segments={segmentList} name={"work"}/>
      <div className="text-center">
        {next}
        {prev}
        </div>
        </Card.Body>
    </Card>
    </main>
    )
  }
  if(show === 5){
    return(
      <main className='register-page-content'>
      <Card>
      <Card.Header>Step {show+1}/8</Card.Header>
      <Card.Body>
      <NextMap name="school"/>
      <div className="text-center">
        {next}
        {prev}
        </div>
        </Card.Body>
    </Card>
    </main>
    )
  }
  if(show === 6){
    return(
      <main className='register-page-content'>
      <Card>
      <Card.Header>Step {show+1}/8</Card.Header>
      <Card.Body>
      <SegmentsDropdown segments={segmentList} name={"school"}/>
      <div className="text-center">
        {next}
        {prev}
        </div>
        </Card.Body>
    </Card>
    </main>
    )
  }
  if(show === 7){
    return(
      <main className='register-page-content'>
      <Card>
      <Card.Header>Step {show+1}/8</Card.Header>
      <Card.Body>
      <div className="text-center">
        {prev}
        {register}
      </div>
        </Card.Body>
    </Card>
    </main>
    )

  }

  
  
  return(<></>);
  
}

export default RegisterPageContent