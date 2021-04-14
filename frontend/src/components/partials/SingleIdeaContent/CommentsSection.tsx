import React, { useContext } from 'react'
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { UserProfileContext } from '../../../contexts/UserProfile.Context';
import { useAllCommentsUnderIdea } from '../../../hooks/commentHooks';
import IdeaCommentTile from '../../tiles/IdeaComment/IdeaCommentTile';
import LoadingSpinner from '../../ui/LoadingSpinner';
import CommentInput from './CommentInput';

interface CommentsSection {
}

const CommentsSection: React.FC<CommentsSection> = () => {
  const { token } = useContext(UserProfileContext);
  const { ideaId } = useParams<{ ideaId: string }>();

  const { 
    data: ideaComments,
    isLoading,
    isError,
    error 
  } = useAllCommentsUnderIdea(ideaId, token);

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
      <h2>Comments</h2>
      {ideaComments && ideaComments.length === 0 ? (
        <Row className='justify-content-center'>
          <p>No Comments yet!</p>
        </Row>
      ) : ideaComments && ideaComments.map(comment => (
        <Row key={comment.id}>
          <IdeaCommentTile commentData={comment} />
        </Row>
      ))
      }
      <Row>
        <CommentInput />
      </Row>
    </Container>
  );
}

export default CommentsSection