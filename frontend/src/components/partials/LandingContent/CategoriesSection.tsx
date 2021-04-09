import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

interface CategoriesSectionProps {

}

const CategoriesSection = (props: CategoriesSectionProps) => {

  return (
    <Container className="py-3">
      <h2 className="pb-1 border-bottom">Project Categories</h2>
      <Row className='justify-content-center g-5 pt-4'>
        <Col xs={6} md={2} className='col-sm-4'>
          <Image className='cat-image' fluid src='/categories/MLC-Icons-Green-01.png' />
          <p className='text-center'>Nature and Food Security</p>
        </Col>
        <Col xs={6} md={2} className='col-sm-4'>
          <Image className='cat-image' fluid src='/categories/MLC-Icons-Green-02.png' />
          <p className='text-center'>Water & Energy</p>
        </Col>
        <Col xs={6} md={2} className='col-sm-4'>
          <Image className='cat-image' fluid src='/categories/MLC-Icons-Green-03.png' />
          <p className='text-center'>Manufacturing & Waste</p>
        </Col>
        <Col xs={6} md={2} className='col-sm-4'>
          <Image className='cat-image' fluid src='/categories/MLC-Icons-Green-04.png' />
          <p className='text-center'>Arts, Culture & Education</p>
        </Col>
        <Col xs={6} md={2} className='col-sm-4'>
          <Image className='cat-image' fluid src='/categories/MLC-Icons-Green-05.png' />
          <p className='text-center'>Community & Place</p>
        </Col>
      </Row>
    </Container>
  )
}

export default CategoriesSection