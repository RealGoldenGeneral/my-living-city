import { Col, Container, Image, Row } from 'react-bootstrap'

interface CategoriesSectionProps {

}

const CategoriesSection = (props: CategoriesSectionProps) => {

  return (
    <Container className="py-5">
      <h2 className="pb-1 border-bottom display-6 text-center">Impact Areas</h2>
      <Row className='justify-content-center g-5 pt-4'>
        <Col xs={6} sm={4} lg={2}>
          <Image className='d-block mx-auto' width='70%' src='/categories/MLC-Icons-Green-01.png' />
          <p className='text-center py-3'>Nature and Food Security</p>
        </Col>
        <Col xs={6} sm={4} lg={2}>
          <Image className='d-block mx-auto' width='70%' src='/categories/MLC-Icons-Green-02.png' />
          <p className='text-center py-3'>Water & Energy</p>
        </Col>
        <Col xs={6} sm={4} lg={2}>
          <Image className='d-block mx-auto' width='70%' src='/categories/MLC-Icons-Green-03.png' />
          <p className='text-center py-3'>Manufacturing & Waste</p>
        </Col>
        <Col xs={6} sm={4} lg={2}>
          <Image className='d-block mx-auto' width='70%' src='/categories/MLC-Icons-Green-04.png' />
          <p className='text-center py-3'>Arts, Culture & Education</p>
        </Col>
        <Col xs={6} sm={4} lg={2}>
          <Image className='d-block mx-auto' width='70%' src='/categories/MLC-Icons-Green-05.png' />
          <p className='text-center py-3'>Community & Place</p>
        </Col>
      </Row>
    </Container>
  )
}

export default CategoriesSection