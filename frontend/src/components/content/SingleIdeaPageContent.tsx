import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { IIdea } from '../../lib/types/data/idea.type';
import { capitalizeString } from '../../lib/utilityFunctions';
import CommentsSection from '../partials/SingleIdeaContent/CommentsSection';
import RatingsSection from '../partials/SingleIdeaContent/RatingsSection';

interface SingleIdeaPageContentProps {
  ideaData: IIdea
}

const SingleIdeaPageContent: React.FC<SingleIdeaPageContentProps> = ({ ideaData }) => {
  const {
    title,
    description,
    communityImpact,
    natureImpact,
    artsImpact,
    energyImpact,
    manufacturingImpact,
    createdAt,
    category,
  } = ideaData;

  const { title: catTitle } = category!;
  const parsedDate = new Date(createdAt);

  return (
    <Container className='single-idea-content'>
      <Row>
        <Col>
          <h1>{title}</h1>
          <h5>Category: {catTitle}</h5>
          <p>Created: {parsedDate.toLocaleDateString()}</p>
          <br />
          <p>{description}</p>
          <p>Community and place: {communityImpact}</p>
          <p>Nature and Food Security: {natureImpact}</p>
          <p>Arts, Culture, and Education: {artsImpact}</p>
          <p>Water and Energy: {energyImpact}</p>
          <p>Manufacturing and Waste: {manufacturingImpact ? capitalizeString(manufacturingImpact) : ""}</p>
        </Col>
      </Row>
      <Row>
        <RatingsSection />
      </Row>
      <Row>
        <CommentsSection />
      </Row>
    </Container>
  );
}

export default SingleIdeaPageContent