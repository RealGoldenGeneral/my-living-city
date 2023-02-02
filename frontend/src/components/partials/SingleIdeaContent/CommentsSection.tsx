import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { IFetchError } from "src/lib/types/types";
import { handlePotentialAxiosError } from "src/lib/utilityFunctions";
import { UserProfileContext } from "../../../contexts/UserProfile.Context";
import {
  useAllCommentsUnderIdea,
  useCreateCommentMutation,
} from "../../../hooks/commentHooks";
import IdeaCommentTile from "../../tiles/IdeaComment/IdeaCommentTile";
import LoadingSpinner from "../../ui/LoadingSpinner";
import CommentSubmitModal from "./CommentSubmitModal";
import { createCommentFlagUnderIdea, updateFalseFlagComment, getAllCommentFlags} from "src/lib/api/flagRoutes";
const CommentsSection = (ideaIdProp: any) => {
  const { ideaId } = ideaIdProp;


  const { token, user, isUserAuthenticated } = useContext(UserProfileContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  // =================== FETCHING COMMENTS HOOK ==========================
  const {
    data: ideaComments,
    isLoading,
    isError,
    error,
  } = useAllCommentsUnderIdea(ideaId, token);

// ===================== REMOVING DEACTIVATED COMMENTS ========================
if(ideaComments){
  for(let i = 0; i < ideaComments.length; i++){
      if(!ideaComments[i].active){
        ideaComments.splice(i, 1);
      }
  }
}

  // =================== SUBMITTING COMMENT MUTATION ==========================
  const {
    submitComment,
    isLoading: commentIsLoading,
    isError: commentIsError,
    error: commentError,
  } = useCreateCommentMutation(parseInt(ideaId), token, user);

  const [showCommentSubmitError, setShowCommentSubmitError] = useState(false);

  useEffect(() => {
    setShowCommentSubmitError(commentIsError);
  }, [commentIsError]);

  // =================== UTILITY FUNCTIONS FOR UI ==========================
  const shouldButtonBeDisabled = (): boolean => {
    // Unauthenticated
    let flag = true;
    if (isUserAuthenticated()) flag = false;
    if (isLoading) flag = true;
    return flag;
  };

  const buttonTextOutput = (): string => {
    // Unauthenticated
    let buttonText = "Please login to comment";
    if (isUserAuthenticated()) buttonText = "Submit Comment";
    if (isLoading) buttonText = "Saving Comment";
    return buttonText;
  };
  // const flagFunc = async(commentId: number, token: string, userId: string, ideaActive: boolean) => {
  //   const createFlagData = await createCommentFlagUnderIdea(commentId, flagReason, token!);
  //   //const updateData = await updateIdeaStatus(token, userId, ideaId.toString(), ideaActive, false);
  //   //const updateFlagData = await updateFalseFlagIdea(parseInt(ideaId.toString()), token!, false);
  // }
  if (error && isError) {
    return <p>An error occured while fetching comments</p>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="my-5">
      <h2>Feedback</h2>
      <CommentSubmitModal
        comments={ideaComments?.slice(0, 10)}
        show={showModal}
        setShow={setShowModal}
        buttonTextOutput={buttonTextOutput}
        shouldButtonBeDisabled={shouldButtonBeDisabled}
        submitComment={submitComment}
        banned={user?.banned}
        token={token}
        setShowCommentSubmitError={setShowCommentSubmitError}
      />
      <div className="comments-wrapper my-3">
        {ideaComments && ideaComments.length === 0 ? (
          <Row className="justify-content-center">
            <p>No Comments yet!</p>
          </Row>
        ) : (
          ideaComments &&
          ideaComments.map((comment) => (
            <Row key={comment.id}>
              <IdeaCommentTile commentData={comment}/>
            </Row>
          ))
        )}
      </div>
      {/* <CommentInput /> */}
      {showCommentSubmitError && (
        <Alert
          className=""
          show={showCommentSubmitError}
          onClose={() => setShowCommentSubmitError(false)}
          dismissible
          variant="danger"
        >
          {commentError?.message ??
            "An Error occured while trying to create your comment."}
        </Alert>
      )}
      <Button
        onClick={() => setShowModal(true)}
        block
        size="lg"
        disabled={shouldButtonBeDisabled()}
      >
        {buttonTextOutput()}
      </Button>
    </Container>
  );
};

export default CommentsSection;
