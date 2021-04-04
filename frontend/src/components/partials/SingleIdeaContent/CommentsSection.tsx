import React from 'react'
import { useParams } from 'react-router';
import { useAllCommentsUnderIdea } from '../../../hooks/commentHooks';
import LoadingSpinner from '../../ui/LoadingSpinner';

interface CommentsSection {
}

const CommentsSection: React.FC<CommentsSection> = () => {
  const { ideaId } = useParams<{ ideaId: string }>();

  const {data: ideaComments, isLoading, isError, error } = useAllCommentsUnderIdea(ideaId);

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
      <h2>Comments</h2>
      {ideaComments && ideaComments.map(comment => (
        <p>{comment.content}</p>
      ))}
    </>
  );
}

export default CommentsSection