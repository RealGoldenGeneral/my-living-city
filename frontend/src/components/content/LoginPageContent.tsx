import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'

export default function LoginPageContent() {
  return (
    <main>
      <Container>
        <Row>
          <Col>
            <Image 
              src='/MyLivingCity_Logo_NameOnly.png'
              fluid
            />
          </Col>
        </Row>
        <Row></Row>
        <Row></Row>
        <Row></Row>
      </Container>
    </main>
  )
}
