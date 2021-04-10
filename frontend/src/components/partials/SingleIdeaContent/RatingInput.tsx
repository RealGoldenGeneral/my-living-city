import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { UserProfileContext } from '../../../contexts/UserProfile.Context';
import { getAxiosJwtRequestOption } from '../../../lib/api/axiosRequestOptions';
import { API_BASE_URL } from '../../../lib/constants';
import { Rating } from '../../../lib/types/data/rating.type';
import { CreateRatingInput } from '../../../lib/types/input/createRating.input';
import { FetchError } from '../../../lib/types/types';

interface RatingInputProps {
  
}

const RatingInput = (props: RatingInputProps) => {
  const { token, user } = useContext(UserProfileContext);
  const { ideaId } = useParams<{ ideaId: string }>();
  const queryClient = useQueryClient();
  const previousRatingsKey = ['ratings', ideaId];

  const ratingMutation = useMutation<Rating, FetchError, CreateRatingInput>(
    newRating => axios.post(
      `${API_BASE_URL}/rating/create/${ideaId}`,
      newRating,
      getAxiosJwtRequestOption(token!),
    ),
  )

  const submitHandler = (values: CreateRatingInput) => {
    console.log(values);
    ratingMutation.mutate(values);
  }

  const formik = useFormik<CreateRatingInput>({
    initialValues: {
      rating: 0,
      ratingExplanation: '',
    },
    onSubmit: submitHandler,
  })

  const { isLoading, isError, isSuccess } = ratingMutation;

  // Helper functions
  const tokenExists = (): boolean => {
    return token != null;
  }

  const shouldButtonBeDisabled = (): boolean => {
    // Unauthenticated
    let flag = true;
    if (tokenExists()) flag = false;
    if (isLoading) flag = true;
    return flag;
  }

  const buttonTextOutput = (): string => {
    // Unauthenticated
    let buttonText = 'Please login to comment';
    if (tokenExists()) buttonText = 'Share';
    if (isLoading) buttonText = 'Saving Comment';
    return buttonText;
  }
  return (
    <Container>
      <Row>
        <Col>
        <Form onSubmit={formik.handleSubmit}>
          <Button
            type='submit'
            disabled={shouldButtonBeDisabled()}
          >
            {buttonTextOutput()}
          </Button>
        </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RatingInput