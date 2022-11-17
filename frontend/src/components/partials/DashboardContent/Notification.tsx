import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { UserProfileContext } from "../../../contexts/UserProfile.Context"
import { updateIdeaNotificationStatus } from "src/lib/api/ideaRoutes";
import { IIdea } from "src/lib/types/data/idea.type";
import { IBanUser } from "src/lib/types/data/banUser.type";
import { updateBan } from "src/lib/api/banRoutes";

interface NotificationProps {
    userIdea?: IIdea | undefined;
    userBanInfo?: IBanUser | undefined;
  
}

const Notification: React.FC<NotificationProps> = ({ userIdea, userBanInfo }) => {
    const [isDismissed, setIsDismissed] = useState(false);
    const [notificationType, setNotificationType] = useState("");
    const { user, token } = useContext(UserProfileContext);
    

    // Set the notification type
    const notiType = (userIdea: IIdea | undefined, userBanInfo: IBanUser | undefined) => {
        if (userIdea) {
            setNotificationType("userIdea");
        } if (userBanInfo) {
            setNotificationType("userBanInfo")
        }
    }

    console.log("Notificationtype: ", notificationType)
    // Render only once
    useEffect(() => {
        notiType(userIdea, userBanInfo);
        
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
                            <td className="col-md">{"You have been "} <b>{banType()}</b> {" because "} {userBanInfo?.banReason} {" until "} <b>{(userBanInfo?.banUntil && new Date(userBanInfo!.banUntil).toLocaleString())}</b>
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