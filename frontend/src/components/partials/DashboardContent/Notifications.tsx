import { useContext, useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Table } from "react-bootstrap";
import { UserProfileContext } from "../../../contexts/UserProfile.Context"
import { updateIdeaNotificationStatus } from "src/lib/api/ideaRoutes";
import { IIdea, IIdeaWithAggregations } from "src/lib/types/data/idea.type";
import Notification from "./Notification";

import { IProposalWithAggregations } from "src/lib/types/data/proposal.type";
interface NotificationPageContentProps {
  userIdeas: IIdeaWithAggregations[] | undefined;
  // proposals: IProposalWithAggregations[] | undefined;
}


const Notifications: React.FC<NotificationPageContentProps> = ({ userIdeas }) => {

  const [isDismissed, setIsDismissed] = useState(true);
  const { user, token } = useContext(UserProfileContext);

  const dismissAll = async () => {
    const result = userIdeas?.map((userIdea) => {
      if (!userIdea.active) {
        updateIdeaNotificationStatus(token, userIdea.authorId, userIdea.id.toString(), true);
      }
    })
    setIsDismissed(false)
  }
  
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

      <div style={{ marginTop: "2rem" }}>
        {
          <Table>
            <tbody>
              {isDismissed && userIdeas && userIdeas!.filter((idea) => !idea.active && !idea.notification_dismissed).map((idea, index) => 
              (< Notification key={idea.id} userIdea={idea}  />
              ))}
            </tbody>
          </Table>
        }
      </div>
    </Container>
  );
};

export default Notifications;
