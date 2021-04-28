import React, { useContext, useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap';
import { UseQueryResult } from 'react-query/types/react';
import { useParams } from 'react-router';
import { IFetchError } from 'src/lib/types/types';
import { UserProfileContext } from '../../../contexts/UserProfile.Context';
import { useAllCommentsUnderIdea, useCreateCommentMutation } from '../../../hooks/commentHooks';
import IdeaCommentTile from '../../tiles/IdeaComment/IdeaCommentTile';
import LoadingSpinner from '../../ui/LoadingSpinner';
import CommentInput from './CommentInput';
import CommentSubmitModal from './CommentSubmitModal';

interface CommentsSection {
}

const CommentsSection: React.FC<CommentsSection> = () => {
  const { token, user, isUserAuthenticated } = useContext(UserProfileContext);
  const { ideaId } = useParams<{ ideaId: string }>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    data: ideaComments,
    isLoading,
    isError,
    error
  } = useAllCommentsUnderIdea(ideaId, token);


  const {
    submitComment,
    isLoading: commentIsLoading,
    isError: commentIsError,
    error: commentError,
  } = useCreateCommentMutation(parseInt(ideaId), token, user);

  const shouldButtonBeDisabled = (): boolean => {
    // Unauthenticated
    let flag = true;
    if (isUserAuthenticated()) flag = false;
    if (isLoading) flag = true;
    return flag;
  }

  const buttonTextOutput = (): string => {
    // Unauthenticated
    let buttonText = 'Please login to comment';
    if (isUserAuthenticated()) buttonText = 'Submit Comment';
    if (isLoading) buttonText = 'Saving Comment';
    return buttonText;
  }

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
    <Container className='my-5'>
      <h2>Feedback</h2>
      <CommentSubmitModal
        comments={ideaComments?.slice(0, 10)}
        show={showModal}
        setShow={setShowModal}
        buttonTextOutput={buttonTextOutput}
        shouldButtonBeDisabled={shouldButtonBeDisabled}
        submitComment={submitComment}
      />
      <div className="comments-wrapper my-3">
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
      </div>
      {/* <CommentInput /> */}
      <Button
        onClick={() => setShowModal(true)}
        block
        size='lg'
        disabled={shouldButtonBeDisabled()}
      >
        {buttonTextOutput()}
      </Button>
    </Container>
  );
}

export default CommentsSection