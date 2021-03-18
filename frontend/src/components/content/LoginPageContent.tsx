import React from 'react'
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'

interface MyFormValues {
  email: string;
  password: string;
}

export default function LoginPageContent() {
  const submitHandler = (values: MyFormValues) =>  {
    console.log(values);
  }

  const formik = useFormik<MyFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: submitHandler
  })

  return (
    <main>
      <Container>
        <Row>
          <Col>
            <Image
              src='/MyLivingCity_Logo_NameOnly.png'
              fluid
            />
          </Col>
        </Row>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
                name='email'
                type='email' 
                placeholder='Enter email'
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                name='password'
                type='password' 
                placeholder='Password' 
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Form.Group>
          </Row>
          <Row>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Row>
        </Form>
      </Container>
    </main>
  )
}
