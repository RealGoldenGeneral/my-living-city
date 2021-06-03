import { Container, Row } from 'react-bootstrap'
import AdsSection from '../partials/LandingContent/AdsSection';
import React from 'react';

export default function Footer() {
  return (
    <div className="footer-copyright text-center w-100 ml-0 push">
      <p className="fluid">COPYRIGHT &#169; MY LIVING CITY {new Date().getFullYear()}</p>

      {/* Mobile View <= 768px */}
      <Row className='d-md-none'>
        <AdsSection />
      </Row>
    </div>
  )
}
