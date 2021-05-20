import { Container, Row } from 'react-bootstrap'
import AdsSection from '../partials/LandingContent/AdsSection'; //
import React from 'react';

export default function Footer() {
  return (
    <div className="outer-footer">
      <Container fluid className="inner-footer">
        {/* <Row as='article' className='adsSection'>
          <AdsSection />
        </Row> */}
        <p className='text-center'>COPYRIGHT &#169; MY LIVING CITY {new Date().getFullYear()}</p>
      </Container>
    </div>
  )
}
