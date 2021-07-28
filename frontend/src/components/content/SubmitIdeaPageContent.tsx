import { Formik, useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button, Alert, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { getUserHomeSegmentInfo, getUserSchoolSegmentInfo, getUserWorkSegmentInfo } from 'src/lib/api/userSegmentRoutes';
import { API_BASE_URL } from 'src/lib/constants';
import { ISegment, ISubSegment } from 'src/lib/types/data/segment.type';
import { UserProfileContext } from '../../contexts/UserProfile.Context';
import { postCreateIdea } from '../../lib/api/ideaRoutes';
import { ICategory } from '../../lib/types/data/category.type';
import { ICreateIdeaInput } from '../../lib/types/input/createIdea.input';
import { IFetchError } from '../../lib/types/types';
import { capitalizeFirstLetterEachWord, capitalizeString, handlePotentialAxiosError } from '../../lib/utilityFunctions';
import ImageUploader from 'react-images-upload';

interface SubmitIdeaPageContentProps {
  categories: ICategory[] | undefined
  segData: any;
}

/**
 * Idea needs categoryId to submit
 * default will be used if categories can't be fetched from server
 */
const DEFAULT_CAT_ID = 1;

const SubmitIdeaPageContent: React.FC<SubmitIdeaPageContentProps> = ({ categories, segData}) => {
  const { token, user } = useContext(UserProfileContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IFetchError | null>(null);
  const [successModal, setSuccessModal] = useState(false);
  const handleClose = () => setSuccessModal(false);
  const [location, setLocation] = useState('Home');
  const [segment, setSegment] = useState<ISegment | undefined>(segData.segment);
  const [subSegment, setSubSegment] = useState<ISubSegment | undefined>(segData.subSegment);
  const history = useHistory();
  const getSegData = async (location: string) => {
    let data: any;
    if(location === 'Resident'){
      data = await getUserHomeSegmentInfo(token);
    }else if(location === 'Worker'){
      data = await getUserWorkSegmentInfo(token);
    }else if (location === 'Student'){
      data = await getUserSchoolSegmentInfo(token);
    }
    
    if(data.segment){
      setSegment(data.segment)
    }else{
      setSegment(undefined);
    }
    if(data.subSegment){
      setSubSegment(data.subSegment);
    }else{
      setSubSegment(undefined);
    }
  }
  const submitHandler = async (values: ICreateIdeaInput) => {
    try {
      // Set loading and error state
      console.log(values);
      setError(null);
      setIsLoading(true);
      setTimeout(() => console.log("timeout"), 5000);
      setSuccessModal(true);
      // if(user){
      //   if(user.banned === true){
      //     setError({message:'You have been banned'});
      //     throw error;
      //   }
      // }
      const res = await postCreateIdea(values, user!.banned, token);
      console.log(res);

      setError(null);
      history.push('/ideas/'+res?.id);
      // formik.resetForm();
    } catch (error) {
      const genericMessage = 'An error occured while trying to create an Idea.';
      const errorObj = handlePotentialAxiosError(genericMessage, error);
      setSuccessModal(false);
      setError(errorObj);
    } finally {
      setIsLoading(false)
    }
  }

  // const formik = useFormik<ICreateIdeaInput>({
  //   initialValues: {
  //     // TODO: CatId when chosen is a string
  //     categoryId: categories ? categories[0].id : DEFAULT_CAT_ID,
  //     title: '',
  //     userType: 'Resident',
  //     description: '',
  //     imagePath: '', // able to send data
  //     artsImpact: '',
  //     communityImpact: '',
  //     energyImpact: '',
  //     manufacturingImpact: '',
  //     natureImpact: '',
  //     address: {
  //       streetAddress: '',
  //       streetAddress2: '',
  //       city: '',
  //       postalCode: '',
  //       country: '',
  //     },
  //     geo: {
  //       lat: undefined,
  //       lon: undefined,
  //     },
  //     segmentId: undefined,
  //     subSegmentId: undefined
  //   },
  //   onSubmit: submitHandler
  // })

  const initialValues: ICreateIdeaInput = {
      // TODO: CatId when chosen is a string
      categoryId: categories ? categories[0].id : DEFAULT_CAT_ID,
      title: '',
      userType: 'Resident',
      description: '',
      imagePath: '', // able to send data
      artsImpact: '',
      communityImpact: '',
      energyImpact: '',
      manufacturingImpact: '',
      natureImpact: '',
      address: {
        streetAddress: '',
        streetAddress2: '',
        city: '',
        postalCode: '',
        country: '',
      },
      geo: {
        lat: undefined,
        lon: undefined,
      },
      segmentId: undefined,
      subSegmentId: undefined
  }

  return (
    <Container className='submit-idea-page-content'>
      <Row className='mb-4 mt-4 justify-content-center'>
          <h2 className="pb-2 pt-2 display-6">Submit Idea</h2>
      </Row>
      <Row className='submit-idea-form-group justify-content-center'>
        <Col lg={10} >
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {submitHandler(values).then(() => {
              actions.setSubmitting(false);
              actions.resetForm({
                values: {
                  categoryId: categories ? categories[0].id : DEFAULT_CAT_ID,
                  title: '',
                  userType: 'Resident',
                  description: '',
                  imagePath: '',
                  artsImpact: '',
                  communityImpact: '',
                  energyImpact: '',
                  manufacturingImpact: '',
                  natureImpact: '',
                  address: {
                    streetAddress: '',
                    streetAddress2: '',
                    city: '',
                    postalCode: '',
                    country: '',
                  },
                  geo: {
                    lat: undefined,
                    lon: undefined,
                  },
                  segmentId: undefined,
                  subSegmentId: undefined
                }
              });
            })
            }}>{({errors, touched, handleSubmit, handleChange, values, setFieldValue}) => (
              <Form onSubmit={handleSubmit}>
              <Form.Group controlId="submitIdeaCategory">
                <Form.Label>Select Category:</Form.Label>
                <Form.Control
                  as="select"
                  name="categoryId"
                  onChange={handleChange}
                  value={values.categoryId}
                >
                  {categories && categories.map(cat => (
                    <option 
                      key={String(cat.id)} 
                      value={Number(cat.id)}
                      style={{
                        textTransform: 'capitalize'
                      }}
                    >
                      {capitalizeString(cat.title)}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>This idea pertains to which area of interest?</Form.Label>
                <Form.Control
                  as='select'
                  name='userType'
                  onChange={(e)=>{
                    getSegData(e.target.value);
                    handleChange(e);
                  }}
                  value={values.userType}
                > <option value={"Resident"}>Resident</option>
                  <option value={"Worker"}>Worker</option>
                  <option value={"Student"}>Student</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Municipality</Form.Label>
                <Form.Control
                  as='select'
                  type='number'
                  name='segmentId'//Change this
                  onChange={handleChange}
                  value={values.segmentId}
                ><option>Select your Idea's municipality</option>
                  {segment &&<option value={segment ? (Number(segment.segId)) : undefined}>{segment ? capitalizeFirstLetterEachWord(segment.name) : ''}</option>}
                  </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Neighbourhood (optional)</Form.Label>
                <Form.Control
                  as='select'
                  name='subSegmentId'
                  onChange={handleChange}
                  value={values.subSegmentId}
                ><option>Select your Idea's neighbourhood</option>
                  {subSegment && <option value={subSegment ? (Number(subSegment.id)) : undefined}>{subSegment ? capitalizeFirstLetterEachWord(subSegment.name) : ''}</option>}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>What is the title of your idea?</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  onChange={handleChange}
                  value={values.title}
                  placeholder="Enter the title of your idea"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Describe your idea</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  name='description'
                  onChange={handleChange}
                  value={values.description}
                />
              </Form.Group>
            
              <Form.Group>
                  <Form.Label>Idea image</Form.Label>
                  <ImageUploader name="imagePath" onChange={(picture) => {setFieldValue('imagePath', picture)}} imgExtension={['.jpg','.jpeg','.png','.webp']} buttonText="Choose Your Idea Image" maxFileSize={10485760} label="Max file size 10mb, accepted:jpg, jpeg, png, webp" singleImage={true}/>
              </Form.Group>
  
              <Form.Group>
                <Form.Label>How does your idea affect the community positively? (7 Petals)</Form.Label>
                <Form.Control 
                  className='idea-impacts'
                  type='text'
                  name='communityImpact'
                  onChange={handleChange}
                  value={values.communityImpact}
                  placeholder='Community and Place'
                />
                <Form.Control 
                  className='idea-impacts'
                  type='text'
                  name='natureImpact'
                  onChange={handleChange}
                  value={values.natureImpact}
                  placeholder='Nature and Food Security'
                />
                <Form.Control 
                  className='idea-impacts'
                  type='text'
                  name='artsImpact'
                  onChange={handleChange}
                  value={values.artsImpact}
                  placeholder='Arts, Culture, and Education'
                />
                <Form.Control 
                  className='idea-impacts'
                  type='text'
                  name='energyImpact'
                  onChange={handleChange}
                  value={values.energyImpact}
                  placeholder='Water and Energy'
                />
                <Form.Control 
                  className='idea-impacts'
                  type='text'
                  name='manufacturingImpact'
                  onChange={handleChange}
                  value={values.manufacturingImpact}
                  placeholder='Manufacturing and Waste'
                />
              </Form.Group>
              <Button
                block
                size="lg"
                type='submit'
                disabled={isLoading ? true : false}
              >
                {isLoading ? "Saving..." : "Submit your idea!"}
            </Button>
            <Modal show={successModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Idea Posted</Modal.Title>
              </Modal.Header>
              <Modal.Body>Your idea is successfully posted</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose} href={`/ideas`}>
                  Done
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
            )}
          </Formik>
        
        {/* <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="submitIdeaCategory">
              <Form.Label>Select Category:</Form.Label>
              <Form.Control
                as="select"
                name="categoryId"
                onChange={formik.handleChange}
                value={formik.values.categoryId}
              >
                {categories && categories.map(cat => (
                  <option 
                    key={String(cat.id)} 
                    value={Number(cat.id)}
                    style={{
                      textTransform: 'capitalize'
                    }}
                  >
                    {capitalizeString(cat.title)}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>This idea pertains to which area of interest?</Form.Label>
              <Form.Control
                as='select'
                name='userType'
                onChange={(e)=>{
                  getSegData(e.target.value);
                  formik.handleChange(e);
                }}
                value={formik.values.userType}
              > <option value={"Resident"}>Resident</option>
                <option value={"Worker"}>Worker</option>
                <option value={"Student"}>Student</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Municipality</Form.Label>
              <Form.Control
                as='select'
                type='number'
                name='segmentId'//Change this
                onChange={formik.handleChange}
                value={formik.values.segmentId}
              ><option>Select your Idea's municipality</option>
                {segment &&<option value={segment ? (Number(segment.segId)) : undefined}>{segment ? capitalizeFirstLetterEachWord(segment.name) : ''}</option>}
                </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Neighbourhood (optional)</Form.Label>
              <Form.Control
                as='select'
                name='subSegmentId'
                onChange={formik.handleChange}
                value={formik.values.subSegmentId}
              ><option>Select your Idea's neighbourhood</option>
                {subSegment && <option value={subSegment ? (Number(subSegment.id)) : undefined}>{subSegment ? capitalizeFirstLetterEachWord(subSegment.name) : ''}</option>}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>What is the title of your idea?</Form.Label>
              <Form.Control
                type='text'
                name='title'
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="Enter the title of your idea"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Describe your idea</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                name='description'
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Form.Group>
          
            <Form.Group controlId="validateimagePath">
                <Form.Label>Idea image</Form.Label>
                <ImageUploader name="imagePath" onChange={(imagePhoto) => {setFieldValue('imagePath', imagePhoto)}} imgExtension={['.jpg','.jpeg','.png','.webp']} buttonText="Choose Your Idea Image" maxFileSize={10485760} label="Max file size 10mb, accepted:jpg, jpeg, png, webp" singleImage={true}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>How does your idea affect the community positively? (7 Petals)</Form.Label>
              <Form.Control 
                className='idea-impacts'
                type='text'
                name='communityImpact'
                onChange={formik.handleChange}
                value={formik.values.communityImpact}
                placeholder='Community and Place'
              />
              <Form.Control 
                className='idea-impacts'
                type='text'
                name='natureImpact'
                onChange={formik.handleChange}
                value={formik.values.natureImpact}
                placeholder='Nature and Food Security'
              />
              <Form.Control 
                className='idea-impacts'
                type='text'
                name='artsImpact'
                onChange={formik.handleChange}
                value={formik.values.artsImpact}
                placeholder='Arts, Culture, and Education'
              />
              <Form.Control 
                className='idea-impacts'
                type='text'
                name='energyImpact'
                onChange={formik.handleChange}
                value={formik.values.energyImpact}
                placeholder='Water and Energy'
              />
              <Form.Control 
                className='idea-impacts'
                type='text'
                name='manufacturingImpact'
                onChange={formik.handleChange}
                value={formik.values.manufacturingImpact}
                placeholder='Manufacturing and Waste'
              />
            </Form.Group>
            <Button
              block
              size="lg"
              type='submit'
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Saving..." : "Submit your idea!"}
          </Button>
          <Modal show={successModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Idea Posted</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your idea is successfully posted</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose} href={`/ideas`}>
                Done
              </Button>
            </Modal.Footer>
          </Modal>
        </Form> */}
          

          {error && (
            <Alert variant='danger' className="error-alert">
              { error.message}
            </Alert>
          )}
          {/* REVIEW: Add ui alert flash to inform user that idea has successfully been created */}
          {successModal}
        </Col>
      </Row>
    </Container>
  );
}

export default SubmitIdeaPageContent