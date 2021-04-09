import { useFormik } from 'formik';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

interface CommentInputProps {

}

const CommentInput = (props: CommentInputProps) => {
  const submitHandler = (values: { content: string }) => {
    console.log(values);
  }

  const formik = useFormik<{ content: string }>({
    initialValues: {
      content: ''
    },
    onSubmit: submitHandler,
  })

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Control
              name='content'
              as='textarea'
              rows={3}
              placeholder='Write your comment here!'
              onChange={formik.handleChange}
              value={formik.values.content}
            />
            <Button block type='submit'>
              Share
              </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CommentInput