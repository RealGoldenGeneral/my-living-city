import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { IIdeaWithAggregations } from "../../lib/types/data/idea.type";
import { IFetchError } from "../../lib/types/types";
import NewAndTrendingSection from "../partials/LandingContent/NewAndTrendingSection";

import AdsSection from "../partials/LandingContent/AdsSection"; //
import { AdsSectionPage } from "src/pages/AdsSectionPage";
import SystemMessages from "../partials/DashboardContent/SystemMessages";
import SystemUpdates from "../partials/DashboardContent/SystemUpdates";

interface LandingPageContentProps {
  topIdeas: IIdeaWithAggregations[] | undefined;
  ideasLoading: boolean;
  ideasIsError: boolean;
  ideasError: IFetchError | null;
}

const DashboardPageContent: React.FC<LandingPageContentProps> = ({
  topIdeas,
  ideasLoading,
  ideasIsError,
  ideasError,
}) => {
  return (
    <Container className="landing-page-content">
      <Row as="article" className="featured"></Row>

      <Row as="article" className="system-messages">
        <SystemMessages />
      </Row>

      {ideasLoading && (
        <div className="landing-spinner d-flex justify-content-center my-4">
          <Spinner animation="border" />
        </div>
      )}

      {topIdeas && !ideasIsError && !ideasLoading && (
        <Row as="article" className="new-and-trending">
          <NewAndTrendingSection topIdeas={topIdeas!} />
        </Row>
      )}

      {ideasLoading && (
        <div className="landing-spinner d-flex justify-content-center my-4">
          <Spinner animation="border" />
        </div>
      )}

      <Row as="article" className="system-updates">
        <SystemUpdates topIdeas={topIdeas!} />
      </Row>
    </Container>
  );
};

export default DashboardPageContent;
