import React from "react";
import { Container, Row, Spinner, Button } from "react-bootstrap";
import { IIdeaWithAggregations } from "../../lib/types/data/idea.type";
import { IFetchError } from "../../lib/types/types";
import NewAndTrendingSection from "../partials/LandingContent/NewAndTrendingSection";
import MyPosts from "../partials/DashboardContent/MyPosts";

import AdsSection from "../partials/LandingContent/AdsSection"; //
import { AdsSectionPage } from "src/pages/AdsSectionPage";
import SystemMessages from "../partials/DashboardContent/SystemMessages";
import SystemUpdates from "../partials/DashboardContent/SystemUpdates";
import LoadingSpinner from "../ui/LoadingSpinner";

interface LandingPageContentProps {
  topIdeas: IIdeaWithAggregations[] | undefined;
  ideasLoading: boolean;
  ideasIsError: boolean;
  ideasError: IFetchError | null;
  userIdeas: any;
}

const DashboardPageContent: React.FC<LandingPageContentProps> = ({
  topIdeas,
  ideasLoading,
  ideasIsError,
  ideasError,
  userIdeas,
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
      {userIdeas && (
        <Row as="article" className="new-and-trending">
          <MyPosts userIdeas={userIdeas!} numPosts={6} isDashboard={true} />
          <div className="centered" style={{ margin: "0 auto" }}>
            <Button
              onClick={() => (window.location.href = "/dashboard/my-posts")}
              size="lg"
            >
              See More
            </Button>
          </div>
        </Row>
      )}
      {!userIdeas && (
        <Row as="article" className="new-and-trending">
          <LoadingSpinner />
        </Row>
      )}
      {topIdeas && !ideasIsError && !ideasLoading && (
        <Row as="article" className="new-and-trending">
          <NewAndTrendingSection topIdeas={topIdeas!} />
        </Row>
      )}
      {topIdeas && !ideasIsError && !ideasLoading && (
        <Row as="article" className="system-updates">
          <SystemUpdates topIdeas={topIdeas!} />
        </Row>
      )}
    </Container>
  );
};

export default DashboardPageContent;
