import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { UserProfileContext } from '../../../contexts/UserProfile.Context';
import { getAxiosJwtRequestOption } from '../../../lib/api/axiosRequestOptions';
import { API_BASE_URL } from '../../../lib/constants';
import { Rating } from '../../../lib/types/data/rating.type';
import { CreateRatingInput } from '../../../lib/types/input/createRating.input';
import { FetchError } from '../../../lib/types/types';
// https://github.com/microsoft/TypeScript/issues/22217
// https://github.com/ekeric13/react-ratings-declarative
import Ratings from 'react-ratings-declarative';

interface RatingInputProps {
  userHasRated: boolean,
  userSubmittedRating: number | null,
}

const RatingInput = ({ userHasRated, userSubmittedRating }: RatingInputProps) => {
  const { token, user } = useContext(UserProfileContext);
  const { ideaId } = useParams<{ ideaId: string }>();
  const [ ratingValue, setRatingValue ] = useState<number>(userSubmittedRating ?? 0);
  const queryClient = useQueryClient();
  const previousRatingsKey = ['ratings', ideaId];

  const ratingMutation = useMutation<Rating, FetchError, CreateRatingInput>(
    newRating => axios.post(
      `${API_BASE_URL}/rating/create/${ideaId}`,
      newRating,
      getAxiosJwtRequestOption(token!),
    ),
    {
      onMutate: async (newRating) => {
        const { id: userId } = user!;

        // snapshot previous value
        const previousRatings = queryClient.getQueryData<Rating[]>(previousRatingsKey);

        // Cancel outgoing refetches
        await queryClient.cancelQueries(previousRatingsKey);

        // Optimistically update to new value
        if (previousRatings) {
          queryClient.setQueryData<Rating[]>(
            previousRatingsKey,
            [
              ...previousRatings,
              {
                id: Math.random(),
                authorId: userId,
                ideaId: parseInt(ideaId!),
                rating: newRating.rating,
                ratingExplanation: newRating.ratingExplanation,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            ]
          )
        }
        console.log(previousRatings);

        return previousRatings
      },
      onError: (err, variables, context: any) => {
        if (context) {
          console.log("Error context", context)
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(previousRatingsKey);
      }
    }
  )

  const parseNegativeRatingValue = (val: number): void => {
    if (userHasRated) return;

    let parsedVal = -1 * val;
    setRatingValue(parsedVal);
  }

  const parsePositiveRatingValue = (val: number): void => {
    if (userHasRated) return;

    let parsedVal = val - 1;
    setRatingValue(parsedVal);
  }

  const submitHandler = () => {
    const payload = {
      rating: ratingValue,
      ratingExplanation: ''
    };
    ratingMutation.mutate(payload);
  }

  const { isLoading, isError, isSuccess, error } = ratingMutation;

  // Loads user submitted rating
  useEffect(() => {
    setRatingValue(userSubmittedRating ?? 0)
  }, [ userSubmittedRating ])

  // Helper functions
  const tokenExists = (): boolean => {
    return token != null;
  }

  const shouldButtonBeDisabled = (): boolean => {
    // Unauthenticated
    let flag = true;
    if (tokenExists()) flag = false;
    if (isLoading) flag = true;
    if (userHasRated) flag = true;
    return flag;
  }

  const buttonTextOutput = (): string => {
    // Unauthenticated
    let buttonText = 'Please login to comment';
    if (tokenExists()) buttonText = 'Share';
    if (isLoading) buttonText = 'Saving Comment';
    if (userHasRated) buttonText = 'You have already rated. You cannot rate an Idea twice.';
    if (!user) buttonText = 'You must sign in to rate an idea'
    return buttonText;
  }
  return (
    <Container>
      <Row>
        <Col xs={12} className='text-center'>
          <Ratings
            rating={-1 * ratingValue}
            widgetRatedColors='red'
            widgetHoverColors='red'
            changeRating={parseNegativeRatingValue}
          >
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
          </Ratings>
          <Ratings
            rating={ratingValue < 0 ? 0 : ratingValue + 1}
            widgetRatedColors='gold'
            widgetHoverColors='gold'
            changeRating={parsePositiveRatingValue}
          >
            <Ratings.Widget
              widgetHoverColor='grey'
              widgetRatedColor='grey'
            />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
            <Ratings.Widget />
          </Ratings>
        </Col>
        <Col xs={12} className='text-center mt-3'>
          <Button
            onClick={submitHandler}
            disabled={shouldButtonBeDisabled()}
          >
            {buttonTextOutput()}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default RatingInput