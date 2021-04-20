import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
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
    <Container className='user-profile-content'>
      <Row className='justify-content-center'>
        <h1>User Profile</h1>
      </Row>
      <Row>
        <Col xs={12} className='section-title'><strong>Personal Information</strong></Col>
        <Col xs={12} >Email: { email }</Col>
        <Col xs={12} lg={6}>First Name: { fname ? capitalizeString(fname) : "Unknown" }</Col>
        <Col xs={12} lg={6}>Last Name: { lname ? capitalizeString(lname) : "Unknown" }</Col>
      </Row>
      <Row>
        <Col xs={12} className='section-title'><strong>Address and Location</strong></Col>
        <Col xs={12} lg={6}>Street Address: { streetAddress ? capitalizeString(streetAddress) : "Unknown" }</Col>
        <Col xs={12} lg={6}>Street Address 2: { streetAddress2 ? capitalizeString(streetAddress2) : "Unknown" }</Col>
        <Col xs={12} lg={6}>City: { city ? capitalizeString(city) : "Unknown" }</Col>
        <Col xs={12} lg={6}>Postal Code / Zip: { postalCode ? postalCode.toUpperCase() : "Unknown" }</Col>
      </Row>

    </Container>
  );
}

export default ProfileContent