import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { IIdea } from '../../lib/types/data/idea.type';
import IdeaTile from '../tiles/IdeaTile';

interface ConversationsPageContentProps {
  ideas: IIdea[] | undefined;
}

// sorting and parsing ideas here

const ConversationsPageContent: React.FC<ConversationsPageContentProps> = ({ ideas }) => {
  return (
    <Container className='conversations-page-content'>
      {ideas && ideas.map(idea => (
        <IdeaTile ideaData={idea} />
      ))}
    </Container>
  );
}

export default ConversationsPageContent