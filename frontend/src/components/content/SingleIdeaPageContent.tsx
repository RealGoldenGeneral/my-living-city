import React from 'react'
import { IdeaInterface } from '../../lib/types/data.types';

interface SingleIdeaPageContentProps {
  ideaData: IdeaInterface
}

const SingleIdeaPageContent: React.FC<SingleIdeaPageContentProps> = ({}) => {
  return (
    <>
      <h1>Idea data here</h1>
    </>
  );
}

export default SingleIdeaPageContent