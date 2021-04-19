import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { CanvasJSChart } from 'src/lib/canvasjs';
import { RatingAggregateSummary, RatingValueBreakdown } from 'src/lib/types/data/rating.type';

interface RatingDisplayProps {
  ratingValueBreakdown: RatingValueBreakdown;
  ratingSummary: RatingAggregateSummary;
}

const RatingDisplay = ({ ratingValueBreakdown, ratingSummary }: RatingDisplayProps) => {
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
          y: strongDisagree,
          color: '#E74236'
        },
        {
          label: 'Slightly Oppose',
          y: slightDisagree,
          color: '#EA5348'
        },
        {
          label: 'Neutral',
          y: neutral,
          color: '#7A7A7A'
        },
        {
          label: 'Slightly Support',
          y: slightAgree,
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

  const {
    negRatings,
    posRatings,
    ratingAvg,
    ratingCount,
  } = ratingSummary;

  return (
    <Container>
      <Row>
        <Col className='text-center'>
          <p>Negative Ratings: {negRatings}</p>
          <p>Positive Ratings: {posRatings}</p>
        </Col>
        <Col className='text-center'>
          <p>Rating Average: {ratingAvg}</p>
          <p>Number of ratings: {ratingCount}</p>
        </Col>
      </Row>
      <Row>
        <CanvasJSChart
          options={options}
        />
      </Row>
    </Container>
  );
}

export default RatingDisplay