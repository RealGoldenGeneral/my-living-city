import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { IIdeaWithAggregations } from '../../lib/types/data/idea.type';
import { timeDifference, truncateString } from '../../lib/utilityFunctions'

interface ideaTileProps {
  ideaData: IIdeaWithAggregations,
  showFooter: boolean,
}

const IdeaTile: React.FC<ideaTileProps> = ({ ideaData, showFooter }) => {
  const {
    id,
    title,
    description,
    updatedAt,
    ratingAvg,
    ratingCount,
    commentCount,
    posRatings,
    negRatings
  } = ideaData;
  return (
    // <Card style={{ width: '18rem' }}>
    <Card>
      {/* <Card.Img variant="top" src="https://via.placeholder.com/300x150" /> */}
      <Card.Body>
        <Card.Title>{truncateString(title, 50)}</Card.Title>
        <Card.Text>{truncateString(description, 100)}</Card.Text>
        <div className="button-breakdown d-flex justify-content-between align-content-center">
          <Card.Link href={`/ideas/${id}`}>
            <Button variant="primary">Read more</Button>
          </Card.Link>
          {/* <div className='d-flex justify-content-around align-content-center'> */}
          <div className='d-flex align-content-center'>
            <p className='px-2 my-auto text-muted'>{ratingAvg.toFixed(2)}</p>
            <p className='px-2 my-auto text-muted'>{ratingCount + commentCount}</p>
            <p className='px-2 my-auto text-muted'>{posRatings}/{negRatings}</p>
          </div>
        </div>
      </Card.Body>
      {showFooter && (
        <Card.Footer>
          <small className='text-muted'>Updated {timeDifference(new Date(), new Date(updatedAt))}</small>
        </Card.Footer>
      )}
    </Card>
  );
}

export default IdeaTile