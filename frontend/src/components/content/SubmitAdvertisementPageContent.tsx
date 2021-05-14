import { NONAME } from 'dns';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Col, Container, Row, Form, Button, Alert } from 'react-bootstrap'
import { CreateAdvertisementInput } from 'src/lib/types/input/advertisement.input';
import { UserProfileContext } from '../../contexts/UserProfile.Context';
import { postCreateIdea } from '../../lib/api/ideaRoutes';
import { IBasicAdvertisement } from '../../lib/types/data/advertisement.type';
import { FetchError } from '../../lib/types/types';
import { capitalizeString, handlePotentialAxiosError } from '../../lib/utilityFunctions';

interface SubmitAdvertisementPageContentProps {
    
};

const SubmitAdvertisementPageContent: React.FC<SubmitAdvertisementPageContentProps> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FetchError | null>(null);
  
    const { token } = useContext(UserProfileContext);
  
  
    const submitHandler = async (values: CreateAdvertisementInput) => {
      try {
        // Set loading and error state
        setError(null);
        setIsLoading(true);
  
        setTimeout(() => console.log("timeout"), 5000);
  
        //const res = await postCreateIdea(values, token);
        //console.log(res);
  
        setError(null);
        formik.resetForm();
      } catch (error) {
        const genericMessage = 'An error occured while trying to create an Idea.';
        const errorObj = handlePotentialAxiosError(genericMessage, error);
        setError(errorObj);
      } finally {
        setIsLoading(false)
      }
    }
  
    const formik = useFormik<CreateAdvertisementInput>({
      initialValues: {
        // TODO: CatId when chosen is a string
        adType: 'BASIC',
        adTitle: '',
        adPosition: '',
        duration: 0,
        published: 'false',
        externalLink: '',
        adImage: null
      },
      onSubmit: submitHandler
    })
  
    return (
      <Container className='submit-advertisement-page-content'>
        
      </Container>
    );
  }

export default SubmitAdvertisementPageContent