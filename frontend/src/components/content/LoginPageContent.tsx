import React, { useContext, useState } from 'react'
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import { IUser } from '../../lib/types/data/user.type';
import { stringify } from 'node:querystring';
import { LoginWithEmailAndPass } from '../../lib/types/input/loginWithEmailAndPass.input';
import { UserProfileContext } from '../../contexts/UserProfile.Context';
import { getUserWithEmailAndPass } from '../../hooks/useUserLoginWithEmailAndPass';
import { FetchError } from '../../lib/types/types';

export default function LoginPageContent() {
  const {
    logout,
    setToken,
    setUser,
    user
  } = useContext(UserProfileContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FetchError | null>(null);

  const submitHandler = async (values: LoginWithEmailAndPass) => {
    try {
      // Set loading 
      setIsLoading(true);

      // Destructure payload and set global and local state
      const { token, user } = await getUserWithEmailAndPass(values);
      const stringifiedUser = JSON.stringify(user);
      localStorage.setItem('logged-user', stringifiedUser);
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user)

      // remove previous errors
      setError(null);
    } catch (error) {
      let errorObj: FetchError = {
        message: "Error occured while logging in user."
      }
      if (error.response) {
        // Request made and server responded
        errorObj.details = {
          errorMessage: error.response.data.message,
          errorStack: error.response.status
        }
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      } 
      setError(errorObj);
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik<LoginWithEmailAndPass>({
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
      <br />
            {/* Remove after */}
            <button onClick={() => logout()}>Logout</button>
      <br />
      <h3>{isLoading ? "Loading" : "Idle"}</h3>
      {
        error && (
          <p>{JSON.stringify(error)}</p>
        )
      }

      <h3>User</h3>
      <p>{JSON.stringify(user)}</p>
    </main>
  )
}
