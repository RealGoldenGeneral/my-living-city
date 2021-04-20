import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useCommentAggregateUnderIdea } from 'src/hooks/commentHooks';
import { UserProfileContext } from '../../../contexts/UserProfile.Context';
import { useAllRatingsUnderIdea } from '../../../hooks/ratingHooks';
import { RatingAggregateSummary } from '../../../lib/types/data/rating.type';
import { checkIfUserHasRated, findUserRatingSubmission, getRatingAggregateSummary } from '../../../lib/utilityFunctions';
import LoadingSpinner from '../../ui/LoadingSpinner';
import RatingDisplay from './RatingDisplay';
import RatingInput from './RatingInput';

interface RatingsSectionProps {
  
}

const RatingsSection: React.FC<RatingsSectionProps> = ({}) => {
  const { user } = useContext(UserProfileContext);
  const { ideaId } = useParams<{ ideaId: string }>();
  
  const { data: ratings, isLoading, isError, error } = useAllRatingsUnderIdea(ideaId);
  const { 
    data: commentAggregate,
    isLoading: aggregateIsLoading,
    isError: aggregateIsError,
    error: aggregateError,
  } = useCommentAggregateUnderIdea(ideaId);
  const [ userHasRated, setUserHasRated ] = 
    useState<boolean>(checkIfUserHasRated(ratings, user?.id));
  const [ userSubmittedRating, setUserHasSubmittedRating ] =
    useState<number | null>(findUserRatingSubmission(ratings, user?.id))
  const [ ratingSummary, setRatingSummary ] = 
    useState<RatingAggregateSummary>(getRatingAggregateSummary(ratings))

  useEffect(() => {
    setRatingSummary(getRatingAggregateSummary(ratings));
    setUserHasRated(checkIfUserHasRated(ratings, user?.id));
    setUserHasSubmittedRating(findUserRatingSubmission(ratings, user?.id));
  }, [ ratings ])


  if ((error && isError) || (aggregateIsError && aggregateError)) {
    return (
      <p>An error occured while fetching comments</p>
    )
  }

  if (isLoading || aggregateIsLoading) {
    return (
      <LoadingSpinner />
    )
  }

  const { ratingValueBreakdown } = ratingSummary
  return (
    <Container className='mt-5'>
      <h2>Ratings</h2>
      {ratingValueBreakdown && commentAggregate && (
        <RatingDisplay 
          ratingValueBreakdown={ratingValueBreakdown} 
          ratingSummary={ratingSummary}
          commentAggregate={commentAggregate}
        />
      )}
      {user && (
        <RatingInput 
          userHasRated={userHasRated} 
          userSubmittedRating={userSubmittedRating}
        />
      )}
    </Container>
  );
}

export default RatingsSection