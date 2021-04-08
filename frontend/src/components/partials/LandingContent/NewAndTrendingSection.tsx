import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { IdeaBreakdown } from '../../../lib/types/data/idea.type';
import IdeaTile from '../../tiles/IdeaTile';

interface NewAndTrendingProps {
  topIdeas: IdeaBreakdown[],
}

const NewAndTrendingSection: React.FC<NewAndTrendingProps> = ({ topIdeas }) => {
  return (
    <Container className="py-5" id="hanging-icons">
      <h2 className="pb-2 border-bottom">New and Trending</h2>
      <Row className="g-5 py-5">
        {topIdeas && topIdeas.map(idea => (
          <Col md={4} className="d-flex align-items-start">
            <IdeaTile ideaData={idea} showFooter={false} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default NewAndTrendingSection