import { useContext, useState } from 'react'
import { Col, Container, Row, Form, Button, Alert, Card } from 'react-bootstrap'
import { useFormik } from 'formik'
import { UserProfileContext } from '../../contexts/UserProfile.Context';
import { FetchError } from '../../lib/types/types';
import { capitalizeString, handlePotentialAxiosError, storeUserAndTokenInLocalStorage } from '../../lib/utilityFunctions';
import { RegisterInput } from '../../lib/types/input/register.input';
import { UserRole } from '../../lib/types/data/userRole.type';
import { postRegisterUser } from '../../lib/api/userRoutes';

interface RegisterPageContentProps {
  userRoles: UserRole[] | undefined;
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
      // Set loading 
      setError(null);
      setIsLoading(true);

      const { token, user } = await postRegisterUser(values);
      storeUserAndTokenInLocalStorage(token, user);
      setToken(token);
      setUser(user);

      // remove previous errors
      setError(null);
      formik.resetForm();
    } catch (error) {
      const genericMessage = 'An error occured while trying to create a new account.';
      const errorObj = handlePotentialAxiosError(genericMessage, error);
      setError(errorObj);
    } finally {
      setIsLoading(false);
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
    <main className='register-page-content'>
        <Card>
          <Card.Body>
            <h1>Create an account</h1>
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
                    <option
                      key={String(role.id)}
                      value={Number(role.id)}
                      style={{
                        textTransform: 'capitalize'
                      }}
                    >
                      {capitalizeString(role.name)}
                    </option>
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

            {error && (
              <Alert variant='danger' className="error-alert">
                { error.message}
              </Alert>
            )}
          </Card.Body>
        </Card>
    </main>
  )
}

export default RegisterPageContent