import { NONAME } from 'dns';
import { Formik, useFormik} from 'formik';
import React, { useContext, useState } from 'react'
import { Col, Container, Row, Form, Button, Alert, Modal } from 'react-bootstrap'
import { CreateAdvertisementInput } from 'src/lib/types/input/advertisement.input';
import { UserProfileContext } from '../../contexts/UserProfile.Context';
import { postCreateAdvertisement } from 'src/lib/api/advertisementRoutes';
import { IAdvertisement } from '../../lib/types/data/advertisement.type';
import { IFetchError } from '../../lib/types/types';
import { capitalizeString, handlePotentialAxiosError, capitalizeFirstLetterEachWord } from '../../lib/utilityFunctions';
import ImageUploader from 'react-images-upload';
import * as Yup from 'yup';
import { values } from 'lodash';

import '../../scss/content/_createAds.scss'
import { ISegment } from 'src/lib/types/data/segment.type';

//TODO: need to include segment property in formik (may not have server route yet) 2022/11/24

interface SubmitAdvertisementPageContentProps {
    segmentOptions: ISegment[] | undefined;
};
//formik form input validation schema
const schema = Yup.object().shape({
  adTitle: Yup.string().min(2,'title is too short!').max(50,'title is too long!').required('title is needed!'),
  adPosition: Yup.string().min(1,'position name can\'t be that short!').max(85,'position name is too long!').required('target position is needed!'),
  published: Yup.bool().required('you need to choose whether you want to publish your advertisement'),
  externalLink: Yup.string().url('please type in a valid url').required('external link is needed!')
});

const SubmitAdvertisementPageContent: React.FC<SubmitAdvertisementPageContentProps> = ({segmentOptions}: SubmitAdvertisementPageContentProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState<IFetchError | null>(null);

    const [successModal, setSuccessModal] = useState(false);
    const handleClose = () => setSuccessModal(false);
    
    // const [success,setSuccess] = useState<String>('');
  
    const { token } = useContext(UserProfileContext);
  
    //submit handler which calls api posting component to post form data of user input
    const submitHandler = async (values: CreateAdvertisementInput) => {
      try {
        
        // Set loading and error state
        setError(null);
        setIsLoading(true);
        //timeout period
        setTimeout(() => console.log("timeout"), 5000);
        //api component call
        const res = await postCreateAdvertisement(values, token);
       
        // setSuccess('You submitted your advertisement successfully');
        setSuccessModal(true);
        // setTimeout(()=> setSuccess(''),5000);
        //if successfully posted, set error to null
        setError(null);
        //reset the form
      } catch (error) {
        const genericMessage = 'An error occured while trying to create an Idea.';
        const errorObj = handlePotentialAxiosError(genericMessage, error);
        setSuccessModal(false);
        setError(errorObj);
      } finally {
        setIsLoading(false)
      }
    };
    //initial values for form
    const initialValues: CreateAdvertisementInput ={
        adType: 'BASIC',
        adTitle: '',
        adPosition: '',
        duration: 0,
        published: false,
        externalLink: '',
        imagePath: '',
    }
  
    return (
      <Container className='submit-advertisement-page-content'>
        <Row className='mb-4 mt-4 justify-content-center'>
          <h2 className="pb-2 pt-2 display-6">Create Advertisement</h2>
        </Row>
        <Row className='submit-advertisement-form-group justify-content-center'>
        <Col lg={10} >
          <Formik
            initialValues = {initialValues}
            validationSchema = {schema}
            onSubmit = {(values,actions) => {submitHandler(values).then(()=>{
              actions.setSubmitting(false);
              actions.resetForm({
                values:{
                  adType: 'BASIC',
                  adTitle: '',
                  adPosition: '',
                  duration: 0,
                  published: false,
                  externalLink: '',
                  imagePath: ''
                }
              });
            })}}
          >{({errors,touched,handleSubmit,handleChange,values,setFieldValue}) => (
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="submitAdvertisementType">
              <Form.Label>Select Advertisement Type</Form.Label>
              <Form.Control as="select" name="adType" onChange={handleChange} value={values.adType}>
                <option key='0' value='BASIC'>BASIC</option>
                <option key='1' value='EXTRA'>EXTRA</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="validateAdTitle">
              <Form.Label>Advertisement title</Form.Label>
              <Form.Control type="text" name="adTitle" onChange={handleChange} value={values.adTitle} placeholder="Your advertisement title" isInvalid={!!errors.adTitle}/>
              <Form.Control.Feedback type="invalid">{errors.adTitle}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validateAdPosition">
              <Form.Label>Segment</Form.Label>
              <Form.Control as="select" name="adPosition" onChange={handleChange} value={values.adPosition}>
                {segmentOptions && segmentOptions.map((segment, i) => {
                  if (i === 0) {values.adPosition = segment.name; }
                  return <option key={i} value={capitalizeFirstLetterEachWord(segment.name)}>{capitalizeFirstLetterEachWord(segment.name)}</option>
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.adPosition}</Form.Control.Feedback>
            </Form.Group>

            {String(values.adType) === "BASIC" 
            ? 
              null
            :
            <>
              <Form.Group controlId="validateDuration">
              <Form.Label>Advertisement Duration in Days</Form.Label>
              <Form.Control type="number" name="duration" size="sm" onChange={handleChange} value={values.duration} placeholder="Your advertisement duration" isInvalid={!!errors.duration}/>
              <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
              </Form.Group>
            </>
            }

            <Form.Group controlId="validateExternalLink">
              <Form.Label>Provide external link for your advertisement</Form.Label>
              <Form.Control type="url" name="externalLink" onChange={handleChange} value={values.externalLink} placeholder="Your external link" isInvalid={!!errors.externalLink}/>
              <Form.Control.Feedback type="invalid">{errors.externalLink}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validateimagePath">
              {/*Need a specific info for image size here*/}
              <ImageUploader name="imagePath" withPreview={true} onChange={(picture) => {setFieldValue('imagePath',picture)}} imgExtension={['.jpg','.jpeg','.png','.webp']} buttonText="Choose your advertisement image" maxFileSize={10485760} label="Max file size 10mb, accepted:jpg, jpeg, png, webp" singleImage={true}/>
              <Form.Control.Feedback type="invalid">{errors.imagePath}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="Publish your advertisement" name="published" onChange={handleChange} isInvalid={!!errors.published} feedback={errors.published}/>
            </Form.Group>
            <Button
              block
              size="lg"
              type='submit'
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Saving..." : "Submit your Advertisement!"}
            </Button>
            <Modal show={successModal} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Ads Posted</Modal.Title>
              </Modal.Header>
              <Modal.Body>Your ads is successfully posted</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose} href={`/advertisement/all`}>
                  Done
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>)}
          </Formik>
          {error && (
            <Alert variant='danger' className="error-alert">
              {error.message}
            </Alert>
          )}
        </Col>
      </Row>
      </Container>
    );
  }

export default SubmitAdvertisementPageContent