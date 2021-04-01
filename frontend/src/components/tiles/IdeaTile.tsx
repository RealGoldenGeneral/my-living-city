import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { IIdea } from '../../lib/types/data/idea.type';

interface ideaTileProps {
  ideaData: IIdea
}

const IdeaTile: React.FC<ideaTileProps> = ({ ideaData }) => {
  const {
    id,
    title,
    description,
  } = ideaData;
  return (
    // <Card style={{ width: '18rem' }}>
    <Card>
      <Card.Img variant="top" src="https://via.placeholder.com/300x150" />
      <Card.Body>
        <Card.Title>{ title }</Card.Title>
        <Card.Text>{ description }</Card.Text>
        <a href={`/ideas/${id}`}>
          <Button variant="primary">Open</Button>
        </a>
      </Card.Body>
    </Card>
  );
}

export default IdeaTile