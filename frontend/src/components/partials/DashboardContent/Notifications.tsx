import React, { useContext, useEffect, useState, Fragment } from "react";
import { Button, Container, Row, Col, Card, Table, Tooltip } from "react-bootstrap";
import { UserProfileContext } from "../../../contexts/UserProfile.Context"
import { updateIdeaNotificationStatus } from "src/lib/api/ideaRoutes";
import { IIdea, IIdeaWithAggregations } from "src/lib/types/data/idea.type";
import Notification from "./Notification";
import { IBanUser } from "src/lib/types/data/banUser.type";
import { updateBan } from "src/lib/api/banRoutes";
import { IComment, ICommentAggregations } from "src/lib/types/data/comment.type";
import { updateCommentNotificationStatus } from "src/lib/api/commentRoutes";

interface NotificationPageContentProps {
  userIdeas: IIdeaWithAggregations[] | undefined;
  userBanInfo: IBanUser | undefined;
  userComments: ICommentAggregations[] | undefined;
}


const Notifications: React.FC<NotificationPageContentProps> = ({ userIdeas, userBanInfo, userComments }) => {

  const [isDismissed, setIsDismissed] = useState(false);
  const { user, token } = useContext(UserProfileContext);
  console.log("Comments: ", userComments)

  const dismissAll = async () => {    
    if (userIdeas) {
      userIdeas?.map(async (userIdea) => {
        if (!userIdea.active && !userIdea.notification_dismissed) {
          await updateIdeaNotificationStatus(token, userIdea.authorId, userIdea.id.toString(), true);
          setIsDismissed(true)
        }
      }
      )
    }

    if (userComments) {
        userComments?.map(async (userComment) => {
          if (!userComment.active && !userComment.notification_dismissed) {
            await updateCommentNotificationStatus(token, userComment.authorId, userComment.id.toString(), true)
          }
          setIsDismissed(true)
        })
      }
    

    if (userBanInfo) {
      userBanInfo!.notificationDismissed = true;
      await updateBan(userBanInfo!, token);
      setIsDismissed(true)
    }
    
  }

  // Check if there are any notifications
  const notifications: JSX.Element[] = [];
  
  // Check if there is ban info
  if (userBanInfo && !userBanInfo.notificationDismissed)
    notifications.push(<Notification userBanInfo={userBanInfo} />)
  userIdeas!.filter((idea) => !idea.active && !idea.notification_dismissed).map((idea, index) => notifications.push(<Notification userIdea={idea} />));
  if (userComments) {
    userComments!.filter((comment) => !comment.active && (comment.authorId === user!.id) && !comment.notification_dismissed).map((comment, index) => notifications.push(<Notification userComment={comment} />))
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

      <div style={{ marginTop: "1rem" }}>
        { 
          !isDismissed && <Table >
            <tbody key={Math.random()}>
              {notifications.map((notification, index) => {
                return (
                  <>
                    {notification}
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
