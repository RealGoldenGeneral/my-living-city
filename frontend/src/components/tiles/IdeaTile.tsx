import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { IdeaBreakdown } from '../../lib/types/data/idea.type';
import { timeDifference, truncateString } from '../../lib/utilityFunctions'

interface ideaTileProps {
  ideaData: IdeaBreakdown,
  showFooter: boolean,
}

const IdeaTile: React.FC<ideaTileProps> = ({ ideaData, showFooter }) => {
  const {
    id,
    title,
    description,
    updatedAt
  } = ideaData;
  return (
    // <Card style={{ width: '18rem' }}>
    <Card>
      {/* <Card.Img variant="top" src="https://via.placeholder.com/300x150" /> */}
      <Card.Body>
        <Card.Title>{truncateString(title, 50)}</Card.Title>
        <Card.Text>{truncateString(description, 100)}</Card.Text>
        <a href={`/ideas/${id}`}>
          <Button variant="primary">Read more</Button>
        </a>
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