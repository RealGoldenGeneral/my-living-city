import { NONAME } from 'dns';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Col, Container, Row, Form, Button, Alert } from 'react-bootstrap'
import { CreateAdvertisementInput } from 'src/lib/types/input/advertisement.input';
import { UserProfileContext } from '../../contexts/UserProfile.Context';
import { postCreateAdvertisement } from 'src/lib/api/advertisementRoutes';
import { IBasicAdvertisement } from '../../lib/types/data/advertisement.type';
import { IFetchError } from '../../lib/types/types';
import { capitalizeString, handlePotentialAxiosError } from '../../lib/utilityFunctions';
import ImageUploader from 'react-images-upload'

interface SubmitAdvertisementPageContentProps {
    
};

const SubmitAdvertisementPageContent: React.FC<SubmitAdvertisementPageContentProps> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState<IFetchError | null>(null);
  
    const { token } = useContext(UserProfileContext);
  
    //sumit handler which calls api posting component to post form data of user input
    const submitHandler = async (values: CreateAdvertisementInput) => {
      try {
        // Set loading and error state
        setError(null);
        setIsLoading(true);
        //timeout period
        setTimeout(() => console.log("timeout"), 5000);
        //api component call
        const res = await postCreateAdvertisement(values, token);
        console.log(res);
        //if successfully posted, set error to null
        setError(null);
        //reset the form
        formik.resetForm();
      } catch (error) {
        const genericMessage = 'An error occured while trying to create an Idea.';
        const errorObj = handlePotentialAxiosError(genericMessage, error);
        setError(errorObj);
      } finally {
        setIsLoading(false)
      }
    };
    //setting state handler for user input based on advertisement input model
    const formik = useFormik<CreateAdvertisementInput>({
      initialValues: {
        adType: 'BASIC',
        adTitle: '',
        adPosition: '',
        duration: 0,
        published: false,
        externalLink: '',
        adImage: undefined
      },
      onSubmit: submitHandler
    });
  
    return (
      <Container className='submit-advertisement-page-content'>
        <Row className='justify-content-center'>
          <h1>Create Advertisement</h1>
        </Row>
        <Row className='submit-idea-form-group justify-content-center'>
        <Col lg={10} >
          <Form noValidate validated={validated}  onSubmit={formik.handleSubmit}>
            <Form.Group controlId="submitAdvertisementType">
              <Form.Label>Select Advertisement Type</Form.Label>
              <Form.Control as="select" name="adType" onChange={formik.handleChange} value={formik.values.adType}>
                <option key='0' value='BASIC'>BASIC</option>
                <option key='1' value='EXTRA'>EXTRA</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="validateAdTitle">
              <Form.Label>Advertisement title</Form.Label>
              <Form.Control type="text" name="adTitle" onChange={formik.handleChange} value={formik.values.adTitle} placeholder="Your advertisement title" required minLength={2} maxLength={40}></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide your advertisement title or make its length between 2 and 40</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validateAdPosition">
              <Form.Label>Target position</Form.Label>
              <Form.Control type="text" name="adPosition" onChange={formik.handleChange} value={formik.values.adPosition} placeholder="Your target position" required minLength={1} maxLength={85}></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide your advertisement title or make its length between 1 and 85</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validateDuration">
              <Form.Label>Advertisement Duration in Days</Form.Label>
              <Form.Control type="number" name="duration" size="sm" onChange={formik.handleChange} value={formik.values.duration} placeholder="Your advertisement duration" required min={1}></Form.Control>
              <Form.Control.Feedback type="invalid">Please provide a valid duration(more than 1 day)</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validateExternalLink">
              <Form.Label>Provide external link for your advertisement</Form.Label>
              <Form.Control type="url" name="externalLink" onChange={formik.handleChange} value={formik.values.externalLink} placeholder="Your external link" required ></Form.Control>
              <Form.Control.Feedback type="invalid">Please a valid external link</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validateAdImage">
              {/*<Form.File label="Your advertisement image" type="image" name="adImage" onChange={formik.handleChange} value={formik.values.adImage} required accept="image/png,image/jepg,image/webp,image/tiff" ></Form.File>*/}
              <ImageUploader name="adImage" onChange={formik.handleChange} imgExtension={['.jpg','.jpeg','.png','.webp']} buttonText="Choose your advertisement image" maxFileSize={10485760} label="Max file size 10mb, accepted:jpg,jpeg,png,webp"/>
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="Publish your advertisement" name="published" onChange={formik.handleChange}></Form.Check>
            </Form.Group>
            <Button
              block
              size="lg"
              type='submit'
              disabled={isLoading ? true : false}
            >
              {isLoading ? "Saving..." : "Submit your Advertisement!"}
            </Button>
          </Form>
          {error && (
            <Alert variant='danger' className="error-alert">
              { error.message}
            </Alert>
          )}
          {/* TODO: Add ui alert flash to inform user that idea has succesfully been created */}
        </Col>
      </Row>
      </Container>
    );
  }

export default SubmitAdvertisementPageContent