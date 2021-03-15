import React from 'react'
import { IdeaData } from '../../lib/types/data.types';

interface SingleIdeaPageContentProps {
  ideaData: IdeaData
}

const SingleIdeaPageContent: React.FC<SingleIdeaPageContentProps> = ({}) => {
  return (
    <>
      <h1>Idea data here</h1>
    </>
  );
}

export default SingleIdeaPageContent