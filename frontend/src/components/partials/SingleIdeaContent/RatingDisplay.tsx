import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { CanvasJSChart } from 'src/lib/canvasjs';
import { RatingValueBreakdown } from 'src/lib/types/data/rating.type';

interface RatingDisplayProps {
  ratingValueBreakdown: RatingValueBreakdown
}

const RatingDisplay = ({ ratingValueBreakdown }: RatingDisplayProps) => {
  const {
    strongDisagree,
    slightDisagree,
    neutral,
    slightAgree,
    strongAgree
  } = ratingValueBreakdown
  const options = {
    title: {
      text: 'Idea Ratings Breakdown',
    },
    axisY: {
      title: 'Number of Ratings'
    },
    data: [{
      type: 'column',
      dataPoints: [
        { 
          label: 'Strongly Oppose',   
          y: strongDisagree   ,
          color: '#E74236'
        },
        { 
          label: 'Slightly Oppose',   
          y: slightDisagree,
          color: '#EA5348'
        },
        { 
          label: 'Neutral',
          y: neutral ,
          color: '#7A7A7A'
        },
        { 
          label: 'Slightly Support',
          y: slightAgree ,
          color: '#99DC56',
        },
        { 
          label: 'Strongly Support',  
          y: strongAgree,
          color: '#8FD945'
        },
      ]
    }]
  };

  return (
    <Container>
      <Row>
        <Col>
          <p>Breakdown</p>
        </Col>
        <Col>
          <p>Breakdown</p>
        </Col>
        <Col sm={12}>
          <CanvasJSChart 
            options={options} 
          />
        </Col>
      </Row>
    </Container>
  );
}

export default RatingDisplay