import { Container, Row } from 'react-bootstrap'
import AdsSection from '../partials/LandingContent/AdsSection'; //
import React from 'react';

export default function Footer() {
  return (
    <div className="outer-footer w-100 ml-0">

      {/* Mobile View <= 768px */}
      <Row className='d-md-none'>
        <AdsSection />
      </Row>

      <p className='text-center'>COPYRIGHT &#169; MY LIVING CITY {new Date().getFullYear()}</p>
    </div>
  )
}
