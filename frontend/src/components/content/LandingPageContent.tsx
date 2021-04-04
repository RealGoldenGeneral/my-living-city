import React from 'react'
import { IIdea } from '../../lib/types/data/idea.type';

interface LandingPageContentProps {
  topIdeas: IIdea[] | undefined;
}

const LandingPageContent: React.FC<LandingPageContentProps> = ({}) => {
  return (
    <p>Landing Page!</p>
  );
}

export default LandingPageContent