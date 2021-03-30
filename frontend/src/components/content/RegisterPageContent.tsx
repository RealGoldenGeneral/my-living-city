import { useContext, useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import { UserProfileContext } from '../../contexts/UserProfile.Context';
import { FetchError } from '../../lib/types/types';
import { storeUserAndTokenInLocalStorage } from '../../lib/utilityFunctions';
import { RegisterInput } from '../../lib/types/input/register.input';
import { UserRole } from '../../lib/types/data/userRole.type';
import { postRegisterUser } from '../../lib/api/userRoutes';

interface RegisterPageContentProps {
  userRoles: UserRole[] | undefined;
}

const validatePasswordInput = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
}

const RegisterPageContent: React.FC<RegisterPageContentProps> = ({ userRoles }) => {
  const {
    setToken,
    setUser,
    user
  } = useContext(UserProfileContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FetchError | null>(null);
  
  const submitHandler = async (values: RegisterInput) => {
    try {
      const { confirmPassword, password } = values;
      // Set loading 
      setIsLoading(true);

      // Ensure password is matching
      if (!validatePasswordInput(confirmPassword, password)) {
        throw new Error("Your passwords don't match. Please make sure that both passwords match.");
      }

      const { token, user } = await postRegisterUser(values);
      storeUserAndTokenInLocalStorage(token, user);
      setToken(token);
      setUser(user);
  
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
        errorObj.message = error.message;
      }
      setError(errorObj);
    } finally {
      setIsLoading(false);
      formik.resetForm();
    }
  }
  
  const formik = useFormik<RegisterInput>({
    initialValues: {
      userRoleId: userRoles ? userRoles[0].id : undefined,
      email: '',
      password: '',
      confirmPassword: '',
      fname: '',
      lname: '',
      address: {
        streetAddress: '',
        streetAddress2: '',
        city: '',
        postalCode: '',
        country: '',
      },
      geo: {
        lon: undefined,
        lat: undefined,
      }
    },
    onSubmit: submitHandler
  })
  
  return (
    <main className='register-page'>
      <Container>
        <Row className='justify-content-center'>
          <h1>Create an account</h1>
        </Row>
        <Row className='register-form-group justify-content-center'>
          <Col sm={10} md={8} lg={6} >
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="registerCredentials">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="name@example.com" 
                />
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="fname"
                  onChange={formik.handleChange}
                  value={formik.values.fname}
                />
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="lname"
                  onChange={formik.handleChange}
                  value={formik.values.lname}
                />
              </Form.Group>
              <Form.Group controlId="registerAddress">
                <Form.Label>Zip / Postal Code</Form.Label>
                <Form.Control 
                  type="text"
                  name="address.postalCode"
                  onChange={formik.handleChange}
                  value={formik.values.address?.postalCode}
                />
              </Form.Group>
              <Form.Group controlId="registerUserType">
                <Form.Label>Choose your desired account type:</Form.Label>
                <Form.Control 
                  as="select"
                  name="userRoleId"
                  onChange={formik.handleChange}
                  value={formik.values.userRoleId}
                >
                  {userRoles && userRoles.map(role => (
                      <option id={String(role.id)} value={role.id}>{role.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button
                block
                type='submit'
                disabled={isLoading ? true : false}
              >
                Register!
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default RegisterPageContent