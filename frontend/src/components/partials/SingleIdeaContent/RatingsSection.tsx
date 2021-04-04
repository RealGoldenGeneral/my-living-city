import React from 'react'
import { useParams } from 'react-router-dom';
import { useAllRatingsUnderIdea } from '../../../hooks/ratingHooks';
import LoadingSpinner from '../../ui/LoadingSpinner';

interface RatingsSectionProps {
  
}

const RatingsSection: React.FC<RatingsSectionProps> = ({}) => {
  const { ideaId } = useParams<{ ideaId: string }>();

  const { data: ideaRatings, isLoading, isError, error } = useAllRatingsUnderIdea(ideaId);

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
    <>
      <h2>Ratings</h2>
      {ideaRatings && ideaRatings.map(rating => (
        <p>{rating.rating}</p>
      ))}
    </>
  );
}

export default RatingsSection