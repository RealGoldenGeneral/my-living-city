import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { UserProfileContext } from '../../../contexts/UserProfile.Context';
import { useAllRatingsUnderIdea } from '../../../hooks/ratingHooks';
import { RatingAggregateSummary } from '../../../lib/types/data/rating.type';
import { checkIfUserHasRated, getRatingAggregateSummary } from '../../../lib/utilityFunctions';
import LoadingSpinner from '../../ui/LoadingSpinner';
import RatingInput from './RatingInput';

interface RatingsSectionProps {
  
}

const RatingsSection: React.FC<RatingsSectionProps> = ({}) => {
  const { user } = useContext(UserProfileContext);
  const { ideaId } = useParams<{ ideaId: string }>();
  
  const { data: ratings, isLoading, isError, error } = useAllRatingsUnderIdea(ideaId);
  const [ userHasRated, setUserHasRated ] = 
    useState<boolean>(checkIfUserHasRated(ratings, user?.id));
  const [ ratingSummary, setRatingSummary ] = 
    useState<RatingAggregateSummary>(getRatingAggregateSummary(ratings))

  useEffect(() => {
    setRatingSummary(getRatingAggregateSummary(ratings));
    setUserHasRated(checkIfUserHasRated(ratings, user?.id));
  }, [ ratings ])

  if (error && isError) {
    return (
      <p>An error occured while fetching comments</p>
    )
  }

  if (isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <Container>
      <h2>Ratings</h2>
      {user && (
        <RatingInput userHasRated={userHasRated} />
      )}
      {ratings && ratings.map(rating => (
        <p key={rating.id}>{rating.rating}</p>
      ))}
    </Container>
  );
}

export default RatingsSection