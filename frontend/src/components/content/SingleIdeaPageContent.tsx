import React from 'react'
import { IIdea } from '../../lib/types/data/idea.type';

interface SingleIdeaPageContentProps {
  ideaData: IIdea
}

const SingleIdeaPageContent: React.FC<SingleIdeaPageContentProps> = ({ ideaData }) => {
  return (
    <>
      <h1>Idea data here</h1>
      <p>{JSON.stringify(ideaData)}</p>
    </>
  );
}

export default SingleIdeaPageContent