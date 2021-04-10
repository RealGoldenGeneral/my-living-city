import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAllRatingsUnderIdea } from '../../../hooks/ratingHooks';
import { RatingAggregateSummary } from '../../../lib/types/data/rating.type';
import { getRatingAggregateSummary } from '../../../lib/utilityFunctions';
import LoadingSpinner from '../../ui/LoadingSpinner';
import RatingInput from './RatingInput';

interface RatingsSectionProps {
  
}

const RatingsSection: React.FC<RatingsSectionProps> = ({}) => {
  const { ideaId } = useParams<{ ideaId: string }>();
  
  const { data: ratings, isLoading, isError, error } = useAllRatingsUnderIdea(ideaId);
  const [ ratingSummary, setRatingSummary ] = 
    useState<RatingAggregateSummary>(getRatingAggregateSummary(ratings))

  useEffect(() => {
    setRatingSummary(getRatingAggregateSummary(ratings));
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
      <RatingInput />
      {ratings && ratings.map(rating => (
        <p key={rating.id}>{rating.rating}</p>
      ))}
    </Container>
  );
}

export default RatingsSection