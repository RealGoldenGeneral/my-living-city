import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { UserProfileContext } from "../../../contexts/UserProfile.Context"
import { updateIdeaNotificationStatus } from "src/lib/api/ideaRoutes";
import { IIdea } from "src/lib/types/data/idea.type";
import { IBanUser } from "src/lib/types/data/banUser.type";
import { updateBan } from "src/lib/api/banRoutes";
import { IComment } from "src/lib/types/data/comment.type";
import { updateCommentNotificationStatus } from "src/lib/api/commentRoutes";

interface NotificationProps {
    userIdea?: IIdea | undefined;
    userBanInfo?: IBanUser | undefined;
    userComment?: IComment | undefined;
  
}

const Notification: React.FC<NotificationProps> = ({ userIdea, userBanInfo, userComment }) => {
    const [isDismissed, setIsDismissed] = useState(false);
    const [notificationType, setNotificationType] = useState("");
    const { user, token } = useContext(UserProfileContext);
    
    console.log("user", user)
    // Set the notification type
    const notiType = (userIdea: IIdea | undefined, userBanInfo: IBanUser | undefined, userComment: IComment | undefined) => {
        if (userIdea) {
            setNotificationType("userIdea");
        } if (userBanInfo) {
            setNotificationType("userBanInfo")
        } if (userComment) {
            setNotificationType("userComment")
        }
    }

    console.log("Notificationtype: ", notificationType)
    // Render only once
    useEffect(() => {
        notiType(userIdea, userBanInfo, userComment);
        
    }, [])

    const banType = () => {
        switch (userBanInfo?.banType) {
            case "WARNING":
                return "Warned";
            case "POST_BAN":
                return "Banned from posting";
            case "SYS_BAN":
                return "Banned from the system";
        }
    }


    const dismissIdeaNotification = async (ideaId: number, token: string, userId: string, notification_dismissed: boolean) => {
        setNotificationType('userIdea')
        userIdea!.notification_dismissed = true;
        await updateIdeaNotificationStatus(token, userId, ideaId.toString(), notification_dismissed);
        setIsDismissed(true);
    }

    const dismissBanNotification = async () => {
        setNotificationType('userBanInfo')
        userBanInfo!.notificationDismissed = true;
        await updateBan(userBanInfo!, token);
        setIsDismissed(true);
        
    }

    const dismissCommentNotification = async (token: string, userId: string, commentId: number, notification_dismissed: boolean) => {
        setNotificationType('userComment')
        userComment!.notification_dismissed = true;
        await updateCommentNotificationStatus(token, userId, commentId.toString(), notification_dismissed );
        setIsDismissed(true);
    }

    switch (notificationType) {
        case "userIdea":
            return (
                <tr >
                    {!isDismissed ? (
                        <div className="d-flex align align-items-center justify-content-between">
                            <td className="col-md">{"Your post named "} <b>{userIdea?.title}</b> {" has been removed from the conversations page due to violation of content"}
                                <div className={"float-right"}>
                                    <Button onClick={async () => await dismissIdeaNotification(userIdea!.id, token!, user!.id, true)}>Dismiss</Button>
                                </div>
                            </td>
                        </div>
                    ) :
                        null
                    }
                </tr>
            )
        case "userBanInfo":
            return (
                <tr>
                    {!isDismissed ? (
                        <div className="d-flex align align-items-center justify-content-between">
                            <td className="col-md">
                                <span>{"You have been "} <b>{banType()}</b> {" because "} <b>{userBanInfo?.banReason}</b> {" until "} <b>{(userBanInfo?.banUntil && new Date(userBanInfo!.banUntil).toLocaleString())}</b>.</span>
                                <br/>
                                <span><b>Mod Message:</b> {userBanInfo?.banMessage}</span>
                                <div className="float-right">
                                    <Button onClick={async () => await dismissBanNotification()}>Dismiss</Button>
                                </div>
                            </td>
                        </div>

                    )
                        :
                        null

                    }
                </tr>
            )
            case "userComment":
                return (
                    <tr>
                        {!isDismissed ? (
                            <div className="d-flex align align-items-center justify-content-between">
                                <td className="col-md">
                                    <span>{"Your comment made to"} <b>{userComment?.content}</b> {" has been removed from the conversations page due to violation of content"}.</span>
                                
                                    <div className="float-right">
                                        <Button onClick={async () => await dismissCommentNotification(token!, user!.id, userComment!.id,  true)}>Dismiss</Button>
                                    </div>
                                </td>
                            </div>
    
                        )
                            :
                            null
    
                        }
                    </tr>
                )
        default:
            return (
                <tr>
                    <div className="d-flex align align-items-center justify-content-between">
                        <>
                            <td>Failed to load notification</td>
                        </>
                    </div>
                </tr>
            )
    }
}

export default Notification;