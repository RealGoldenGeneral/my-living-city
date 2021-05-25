import React from 'react'
import { Col, Container, Row, Card, Image, ListGroup, ListGroupItem} from 'react-bootstrap';
import { IUser } from '../../lib/types/data/user.type';
import { capitalizeString } from '../../lib/utilityFunctions';

interface ProfileContentProps {
  user: IUser
}

const ProfileContent: React.FC<ProfileContentProps> = ({ user }) => {
  const {
    email,
    fname,
    lname,
    address,
  } = user;

  const {
    streetAddress,
    streetAddress2,
    city,
    postalCode,
    country,
  } = address!;
  
  return (
    <Container className='user-profile-content w-100'>
      <Row className='justify-content-center'>
      <h1 className="pb-1 border-bottom display-6 text-center">User Profile</h1>
      </Row>

      <Row>
        <Card className='text-center mx-5' style={{ width: '18rem'}}>
            <Row className='mt-3'>
              <Col>
                <Image fluid src='https://ih1.redbubble.net/image.785212781.7855/st,small,507x507-pad,600x600,f8f8f8.jpg' 
                  width='70%' roundedCircle/>
              </Col>
            </Row>
            <Card.Title className='mt-3'>{ fname ? capitalizeString(fname) : "Unknown" } { lname ? capitalizeString(lname) : "Unknown" }</Card.Title>
            <Card.Text className='mb-3'>{ email }</Card.Text>
          </Card>
          
        <Card style={{ width: '40rem'}}>
          <Row className='justify-content-center mt-3'>
              <ListGroup variant='flush' className=''>
                <ListGroup.Item><strong>Full Name</strong></ListGroup.Item>
                <ListGroup.Item><strong>Email</strong></ListGroup.Item>
                <ListGroup.Item><strong>Street Address</strong></ListGroup.Item>
                <ListGroup.Item><strong>Street Address 2</strong></ListGroup.Item>
                <ListGroup.Item><strong>City</strong></ListGroup.Item>
                <ListGroup.Item><strong>Postal Code / Zip</strong></ListGroup.Item>
              </ListGroup>
            
              <ListGroup variant='flush' className=''>
                <ListGroup.Item>{ fname ? capitalizeString(fname) : "Unknown" } { lname ? capitalizeString(lname) : "Unknown" }</ListGroup.Item>
                <ListGroup.Item>{ email }</ListGroup.Item>
                <ListGroup.Item>{ streetAddress ? capitalizeString(streetAddress) : "Unknown" }</ListGroup.Item>
                <ListGroup.Item>{ streetAddress2 ? capitalizeString(streetAddress2) : "Unknown" }</ListGroup.Item>
                <ListGroup.Item>{ city ? capitalizeString(city) : "Unknown" }</ListGroup.Item>
                <ListGroup.Item>{ postalCode ? postalCode.toUpperCase() : "Unknown" }</ListGroup.Item>
              </ListGroup>
          </Row>
        </Card>
      </Row>
      
      
    </Container>
  );
}

export default ProfileContent