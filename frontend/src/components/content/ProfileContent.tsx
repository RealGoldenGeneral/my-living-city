import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Card, Image, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import { postUserSegmentRequest } from 'src/lib/api/userSegmentRequestRoutes';
import { API_BASE_URL } from 'src/lib/constants';
import { IUser } from '../../lib/types/data/user.type';
import { capitalizeString } from '../../lib/utilityFunctions';
import { RequestSegmentModal } from '../partials/RequestSegmentModal';
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {STRIPE_PUBLIC_KEY,STRIPE_PRODUCT_40} from "src/lib/constants"

interface ProfileContentProps {
  user: IUser;
  token: string;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ user, token }) => {
  const {
    email,
    fname,
    lname,
    address,
    userSegments,
    imagePath,
  } = user;

  const {
    streetAddress,
    streetAddress2,
    city,
    postalCode,
    country,
  } = address!;
  const [show, setShow] = useState(false);
  const [stripeLoading, setStripeLoading] = useState<boolean>(false);
  const [stripeError, setStripeError] = useState(null);
  const [segmentRequests, setSegmentRequests] = useState<any[]>([]);
  const item = {
    price: STRIPE_PRODUCT_40,
    quantity: 1
  };
    
  let stripePromise: any;

  const getStripe = async ()  => {
    if (!stripePromise) {
      stripePromise = await loadStripe(STRIPE_PUBLIC_KEY);
    }
    return stripePromise;
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: window.location.href,
    cancelUrl: window.location.href
  };

  const redirectToCheckout = async () => {
    setStripeLoading(true);
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setStripeLoading(false);
  };

  if (stripeError) alert(stripeError);

  useEffect(()=>{
    if(segmentRequests.length > 0){
      postUserSegmentRequest(segmentRequests, token);
    }
  },[segmentRequests])
  return (
    <Container className='user-profile-content w-100'>
      <Row className='mb-4 mt-4 justify-content-center'>
          <h2 className="pb-2 pt-2 display-6">User Profile</h2>
      </Row>

      <Row>
        <Card className='text-center mx-5 mb-5' style={{ width: '18rem'}}>
            <Row className='mt-3'>
              <Col>
              {imagePath
              ? <Image fluid src={`${API_BASE_URL}/${imagePath}`} style={{objectFit: "cover", height:"200px", width:"200px"}}roundedCircle/>
              : <Image fluid src='https://ih1.redbubble.net/image.785212781.7855/st,small,507x507-pad,600x600,f8f8f8.jpg' width='70%' roundedCircle/>}
              </Col>
            </Row>
            <Card.Title className='mt-3'>{ fname ? capitalizeString(fname) : "Unknown" } { lname ? capitalizeString(lname) : "Unknown" }</Card.Title>
            <Card.Text className='mb-3'>{ email }</Card.Text>
              <button type="button" className="btn btn-primary btn-lg m-4" onClick={redirectToCheckout} disabled={stripeLoading}>
                  {stripeLoading ? "Loading..." : "Upgrade Now"}
              </button>
          </Card>
        
          
        <Card style={{ width: '40rem'}}>
          <Row className='justify-content-center mt-3'>
              <ListGroup variant='flush' className=''>
                <ListGroup.Item><strong>Full Name</strong></ListGroup.Item>
                <ListGroup.Item><strong>Email</strong></ListGroup.Item>
                <ListGroup.Item><strong>Street Address</strong></ListGroup.Item>
                {streetAddress2 ? <ListGroup.Item><strong>Street Address 2</strong></ListGroup.Item> : null}
                <ListGroup.Item><strong>City</strong></ListGroup.Item>
                <ListGroup.Item><strong>Postal Code / Zip</strong></ListGroup.Item>
                <ListGroup.Item><strong>Community Request</strong></ListGroup.Item>
              </ListGroup>
            
              <ListGroup variant='flush' className=''>
                <ListGroup.Item>{ fname ? capitalizeString(fname) : "Unknown" } { lname ? capitalizeString(lname) : "Unknown" }</ListGroup.Item>
                <ListGroup.Item>{ email }</ListGroup.Item>
                <ListGroup.Item>{ streetAddress ? capitalizeString(streetAddress) : "Unknown" }</ListGroup.Item>
                {streetAddress2 ? <ListGroup.Item>{ streetAddress2 ? capitalizeString(streetAddress2) : "Unknown" }</ListGroup.Item> : null}
                <ListGroup.Item>{ city ? capitalizeString(city) : capitalizeString(userSegments!.homeSegmentName) }</ListGroup.Item>
                <ListGroup.Item>{ postalCode ? postalCode.toUpperCase() : "Unknown" }</ListGroup.Item>
                <ListGroup.Item><Button variant="link" onClick={()=>setShow(b=>!b)}>Request your Community!</Button></ListGroup.Item>
              </ListGroup>
              <RequestSegmentModal showModal={show} setShowModal={setShow} index={0} 
              setSegmentRequests={setSegmentRequests} segmentRequests={segmentRequests}/>
          </Row>
        </Card>
      </Row>
      
      
    </Container>
  );
}

export default ProfileContent