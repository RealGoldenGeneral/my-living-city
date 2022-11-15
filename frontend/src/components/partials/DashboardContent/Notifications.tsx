import React, { useContext, useEffect, useState, Fragment } from "react";
import { Button, Container, Row, Col, Card, Table, Tooltip } from "react-bootstrap";
import { UserProfileContext } from "../../../contexts/UserProfile.Context"
import { updateIdeaNotificationStatus } from "src/lib/api/ideaRoutes";
import { IIdea, IIdeaWithAggregations } from "src/lib/types/data/idea.type";
import Notification from "./Notification";
import { IProposalWithAggregations } from "src/lib/types/data/proposal.type";
import { IBanUser } from "src/lib/types/data/banUser.type";
import { updateBan } from "src/lib/api/banRoutes";

interface NotificationPageContentProps {
  userIdeas: IIdeaWithAggregations[] | undefined;
  userBanInfo: IBanUser | undefined;
  // proposals: IProposalWithAggregations[] | undefined;
}


const Notifications: React.FC<NotificationPageContentProps> = ({ userIdeas, userBanInfo }) => {

  const [isDismissed, setIsDismissed] = useState(false);
  const { user, token } = useContext(UserProfileContext);

  const dismissAll = async () => {
    userIdeas?.map(async (userIdea) => {
      if (!userIdea.active) {
        await updateIdeaNotificationStatus(token, userIdea.authorId, userIdea.id.toString(), true);
      }
    }
    )
    if (userBanInfo) {
      userBanInfo.notificationDismissed = true;
      await updateBan(userBanInfo!, token);
    }
  }

  // Check if there are any notifications
  const notifications: JSX.Element[] = [];
  // Check if there is ban info
  if (userBanInfo && !userBanInfo.notificationDismissed)
    notifications.push(<Notification userBanInfo={userBanInfo} />)
  userIdeas!.filter((idea) => !idea.active && !idea.notification_dismissed).map((idea, index) => notifications.push(<Notification userIdea={idea} />));

  console.log("Notification Length: " + notifications.length);
  console.log(notifications)
  
  return (
    <Container
      className="system"
      id="hanging-icons"
      // Top Right Bottom Left
      style={{ padding: "3rem 1rem 0rem 1rem", margin: "0 auto" }}
    >
      <style>
        {`
         td {
            border-top: 0.5px solid #d4d4d4 !important;
            border-bottom: 0.5px solid #d4d4d4 !important;
         }
         tr:hover {
           background-color: #e8ffe9;
           cursor: pointer;
        }
        h5 {
          display: inline;
        }
        `}
      </style>
      <div className="d-flex justify-content-between border-bottom display-6">
        <div className="col-example text-left">
          <h2 className="display-6">Notifications</h2>
        </div>
        <div className="col-example text-left">
          <Button onClick={async () => await dismissAll()}>Dismiss All</Button>
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        {
          <Table >
            <tbody>
              {notifications.map((notification, index) => {
                return (
                  <>
                    { notification }
                  </>
                )
              })}
            </tbody> 
          </Table>
        }
      </div>
    </Container>
  );
};

export default Notifications;
