import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button, Alert, Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
// import { getUserHomeSegmentInfo, getUserSchoolSegmentInfo, getUserWorkSegmentInfo } from 'src/lib/api/userSegmentRoutes';
import { API_BASE_URL } from 'src/lib/constants';
import { ISegment, ISegmentData, ISubSegment } from 'src/lib/types/data/segment.type';
import { UserProfileContext } from '../../contexts/UserProfile.Context';
import { postCreateIdea } from '../../lib/api/ideaRoutes';
import { ICategory } from '../../lib/types/data/category.type';
import { ICreateIdeaInput } from '../../lib/types/input/createIdea.input';
import { IFetchError } from '../../lib/types/types';
import { capitalizeFirstLetterEachWord, capitalizeString, handlePotentialAxiosError } from '../../lib/utilityFunctions';

interface SubmitIdeaPageContentProps {
  categories: ICategory[] | undefined
  segData: ISegmentData[];
}

/**
 * Idea needs categoryId to submit
 * default will be used if categories can't be fetched from server
 */
const DEFAULT_CAT_ID = 1;

const SubmitIdeaPageContent: React.FC<SubmitIdeaPageContentProps> = ({ categories, segData}) => {
  // const {homeSegmentName, workSegmentName, schoolSegmentName} = segData;
  // const {homeSubSegmentName, workSubSegmentName, schoolSubSegmentname} = segData;
  // const {homeSegmentId, workSegmentId, schoolSegmentId} = segData;
  const { token, user } = useContext(UserProfileContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IFetchError | null>(null);
  const [successModal, setSuccessModal] = useState(false);
  const handleClose = () => setSuccessModal(false);
  const [location, setLocation] = useState('Home');
  const [formikString, setFormikString] = useState('');
  // const [segment, setSegment] = useState<ISegment | undefined>(segData.segment);
  // const [subSegment, setSubSegment] = useState<ISubSegment | undefined>(segData.subSegment);
  const history = useHistory();
  const handleCommunityChange = (index: number) => {
    if(segData[index].segType === 'Segment') {
      formik.setFieldValue('segmentId',segData[index].id);
      formik.setFieldValue('superSegmentId',undefined);
      formik.setFieldValue('subSegmentId',undefined);
    }
    if(segData[index].segType === 'Sub-Segment') {
      formik.setFieldValue('subSegmentId',segData[index].id);
      formik.setFieldValue('superSegmentId',undefined);
      formik.setFieldValue('segmentId',undefined);
    }
    if(segData[index].segType === 'Super-Segment'){
      formik.setFieldValue('superSegmentId',segData[index].id);
      formik.setFieldValue('subSegmentId',undefined);
      formik.setFieldValue('segmentId',undefined);
    }
    formik.setFieldValue('userType', segData[index].userType);
  }
  const submitHandler = async (values: ICreateIdeaInput) => {
    try {
      // Set loading and error state
      console.log(values);
      setError(null);
      setIsLoading(true);
      setTimeout(() => console.log("timeout"), 5000);
      const res = await postCreateIdea(values, user!.banned, token);
      console.log(res);

      setError(null);
      history.push('/ideas/'+res.id);
      formik.resetForm();
    } catch (error) {
      const genericMessage = 'An error occured while trying to create an Idea.';
      const errorObj = handlePotentialAxiosError(genericMessage, error);
      setSuccessModal(false);
      setError(errorObj);
    } finally {
      setIsLoading(false);
      // setSuccessModal(true);
    }
  }
  // console.log(segment);
  // console.log(subSegment);
  const formik = useFormik<ICreateIdeaInput>({
    initialValues: {
      // TODO: CatId when chosen is a string
      categoryId: categories ? categories[0].id : DEFAULT_CAT_ID,
      title: '',
      userType: segData ? segData[0].userType : 'Resident',
      description: '',
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
      subSegmentId: undefined,
      superSegmentId: undefined
    },
    onSubmit: submitHandler
  })
  useEffect(() => {
    if(segData){
      handleCommunityChange(0);
    }

  },[])
  return (
    <Container className='submit-idea-page-content'>
      <Row className='mb-4 mt-4 justify-content-center'>
          <h2 className="pb-2 pt-2 display-6">Submit Idea</h2>
      </Row>
      <Row className='submit-idea-form-group justify-content-center'>
        <Col lg={10} >
          <Form onSubmit={formik.handleSubmit}>
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
              <Form.Label>Select your community of interest</Form.Label>
              <Form.Control
                as='select'
                type='number'
                onChange={(e)=>handleCommunityChange(Number(e.target.value))}
              >
                {segData && segData.map((seg, index) => (
                  <option key={String(seg.name)} value={index}>
                    {capitalizeString(seg.name)}
                  </option>
                ))}
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

            <Form.Group>
              <Form.Label>Impact Areas</Form.Label>
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
          </Form>

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