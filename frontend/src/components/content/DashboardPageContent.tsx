import React from "react";
import { Container, Row, Spinner, Button, Carousel } from "react-bootstrap";
import { IIdeaWithAggregations } from "../../lib/types/data/idea.type";
import { IFetchError } from "../../lib/types/types";
import NewAndTrendingSection from "../partials/LandingContent/NewAndTrendingSection";
import MyPosts from "../partials/DashboardContent/MyPosts";

import AdsSection from "../partials/LandingContent/AdsSection"; //
import { AdsSectionPage } from "src/pages/AdsSectionPage";
import Notifications from "../partials/DashboardContent/Notifications";
import SystemUpdates from "../partials/DashboardContent/SystemUpdates";
import LoadingSpinner from "../ui/LoadingSpinner";
import { IBanUser } from "../../lib/types/data/banUser.type";
import { useIdeasHomepage, useUserFollowedIdeas, useUserIdeas } from "../../hooks/ideaHooks";
import { IUser } from "src/lib/types/data/user.type";
import { FindBanDetails } from "src/hooks/banHooks";

interface LandingPageContentProps {
  user: IUser
  token: string;
}

const DashboardPageContent: React.FC<LandingPageContentProps> = ({user, token}) => {
  const {
    data: topIdeasData,
    error: iError,
    isLoading: iLoading,
    isError: iIsError,
  } = useIdeasHomepage();

  //CHANGES_NEEDED: Find way to wait for user id to be loaded before useUserIdeas
  const {
    data: userIdeaData,
    error: uError,
    isLoading: uLoading,
  } = useUserIdeas(user.id);

  const {
    data: userFollowedIdeaData,
    error: userFollowedError,
    isLoading: userFollowedLoading,
  } = useUserFollowedIdeas(user.id)

  let userBannedData, userBannedDataError, userBannedDataLoading;
  if (user.banned) {
    ({
      data: userBannedData,
      isError: userBannedDataError,
      isLoading: userBannedDataLoading
    } = FindBanDetails(user.id));
  }

  if (iLoading || uLoading || userFollowedLoading || userBannedDataLoading) {
    return <LoadingSpinner />;
  }

  if (iError || uError || userFollowedError || userBannedDataError) {
    return <div>Error when fetching necessary data</div>;
  }
  return (
    <Container className="landing-page-content">
      <Row as="article" className="featured"></Row>
      <Row as="article" className="system-messages">
        <Notifications userIdeas={userIdeaData} userBanInfo={userBannedData}/>
      </Row>
      <Row as="article" className="new-and-trending">
        <MyPosts userIdeas={userIdeaData!} numPosts={6} isDashboard={true} />
        <div className="" style={{ margin: "0rem 1rem 3rem 1rem" }}>
          <Button
            onClick={() => (window.location.href = "/dashboard/my-posts")}
            size="lg"
          >
            See More
          </Button>
        </div>
      </Row>
      <Row as="article" className="new-and-trending">
        <NewAndTrendingSection topIdeas={topIdeasData!} isDashboard={true} />
      </Row>
      <br/><br/>
      <Row as="article" className="system-updates">
        <SystemUpdates userFollowedideas={userFollowedIdeaData!} />
      </Row>
    </Container>
  );
};

export default DashboardPageContent;
