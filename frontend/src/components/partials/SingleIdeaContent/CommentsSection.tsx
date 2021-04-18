import React, { useContext, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import { UserProfileContext } from '../../../contexts/UserProfile.Context';
import { useAllCommentsUnderIdea } from '../../../hooks/commentHooks';
import IdeaCommentTile from '../../tiles/IdeaComment/IdeaCommentTile';
import LoadingSpinner from '../../ui/LoadingSpinner';
import CommentInput from './CommentInput';
import CommentSubmitModal from './CommentSubmitModal';

interface CommentsSection {
}

const CommentsSection: React.FC<CommentsSection> = () => {
  const { token } = useContext(UserProfileContext);
  const { ideaId } = useParams<{ ideaId: string }>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { 
    data: ideaComments,
    isLoading,
    isError,
    error 
  } = useAllCommentsUnderIdea(ideaId, token);


  // 

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
      <CommentSubmitModal show={showModal} setShow={setShowModal} />
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
        {/* <Button 
          onClick={() => setShowModal(true)}
          disabled={}
        >
          Show Modal
        </Button> */}
      </Row>
    </Container>
  );
}

export default CommentsSection