import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { IdeaBreakdown, IIdea } from '../../lib/types/data/idea.type';
import { FetchError } from '../../lib/types/types';
import HeroBannerSection from '../partials/LandingContent/HeroBannerSection';
import NewAndTrendingSection from '../partials/LandingContent/NewAndTrendingSection';
import LoadingSpinner from '../ui/LoadingSpinner';

interface LandingPageContentProps {
  topIdeas: IdeaBreakdown[] | undefined;
  ideasLoading: boolean,
  ideasIsError: boolean,
  ideasError: FetchError | null,
}

const LandingPageContent: React.FC<LandingPageContentProps> = ({
  topIdeas,
  ideasLoading,
  ideasIsError,
  ideasError,
}) => {
  return (
    <Container className='landing-page-content'>
        <HeroBannerSection />
      <Row as='article' className='featured'>
      </Row>
      <Row as='article' className='new-and-trending'>
        {ideasLoading && (
          <LoadingSpinner />
        )}
        {topIdeas && !ideasIsError && !ideasLoading && (
          <NewAndTrendingSection topIdeas={topIdeas!} />
        )}
      </Row>
      <Row as='article' className='categories'>
        <p>Categories</p>
      </Row>
      <Row as='article' className='description'>
        <p>Description</p>
      </Row>
    </Container>
  );
}

export default LandingPageContent