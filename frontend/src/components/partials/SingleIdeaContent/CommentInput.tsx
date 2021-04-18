import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from 'formik';
import { useContext, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { UserProfileContext } from '../../../contexts/UserProfile.Context';
import { getAxiosJwtRequestOption } from '../../../lib/api/axiosRequestOptions';
import { API_BASE_URL } from '../../../lib/constants';
import { Comment } from '../../../lib/types/data/comment.type';
import { CreateCommentInput } from '../../../lib/types/input/createComment.input';
import { FetchError } from '../../../lib/types/types';
import { useCreateCommentMutation } from 'src/hooks/commentHooks';

interface CommentInputProps {

}

const CommentInput = (props: CommentInputProps) => {
  const { token, user } = useContext(UserProfileContext);
  const { ideaId } = useParams<{ ideaId: string }>();
  const queryClient = useQueryClient();
  const previousCommentsKey = ['comments', ideaId];
  // https://react-query.tanstack.com/guides/mutations#persist-mutations
  // https://stackoverflow.com/questions/65760158/react-query-mutation-typescript

  const {
    submitComment,
    isLoading,
    isError,
    isSuccess,
    error
  } = useCreateCommentMutation(parseInt(ideaId), token, user);


  const submitHandler = (values: { content: string }) => {
    submitComment(values);
    formik.resetForm();
  }

  const formik = useFormik<{ content: string }>({
    initialValues: {
      content: ''
    },
    onSubmit: submitHandler,
  })

  // Helper Functions
  const tokenExists = (): boolean => {
    return token != null;
  }

  const shouldButtonBeDisabled = (): boolean => {
    // Unauthenticated
    let flag = true;
    if (tokenExists()) flag = false;
    if (isLoading) flag = true;
    return flag;
  }

  const buttonTextOutput = (): string => {
    // Unauthenticated
    let buttonText = 'Please login to comment';
    if (tokenExists()) buttonText = 'Share';
    if (isLoading) buttonText = 'Saving Comment';
    return buttonText;
  }

  useEffect(() => {
    console.log(isLoading, isError, isSuccess);
  }, [isLoading, isError, isSuccess])

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            {tokenExists() && (
              <Form.Control
                name='content'
                as='textarea'
                rows={3}
                placeholder='Write your comment here!'
                onChange={formik.handleChange}
                value={formik.values.content}
              />
            )}
            <Button
              block
              type='submit'
              disabled={shouldButtonBeDisabled()}
            >
              {buttonTextOutput()}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CommentInput