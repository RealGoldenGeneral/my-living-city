import React from 'react'
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAllRatingsUnderIdeaWithAggregations } from '../../../hooks/ratingHooks';
import LoadingSpinner from '../../ui/LoadingSpinner';

interface RatingsSectionProps {
  
}

const RatingsSection: React.FC<RatingsSectionProps> = ({}) => {
  const { ideaId } = useParams<{ ideaId: string }>();


  const {
    data: ideaAggregateResponse, isLoading, isError, error
  } = useAllRatingsUnderIdeaWithAggregations(ideaId);

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
      {ideaAggregateResponse?.ratings && ideaAggregateResponse.ratings.map(rating => (
        <p key={rating.id}>{rating.rating}</p>
      ))}
    </Container>
  );
}

export default RatingsSection