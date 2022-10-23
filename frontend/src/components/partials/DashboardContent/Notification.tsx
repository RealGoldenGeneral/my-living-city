import { useContext, useEffect, useState } from "react";
import { Button, Container, Row, Col, Card, Table } from "react-bootstrap";
import { UserProfileContext } from "../../../contexts/UserProfile.Context"
import { updateIdeaNotificationStatus } from "src/lib/api/ideaRoutes";
import { IIdea} from "src/lib/types/data/idea.type";

import { IProposalWithAggregations } from "src/lib/types/data/proposal.type";
interface NotificationProps {
    userIdea: IIdea | undefined;
    // proposals: IProposalWithAggregations[] | undefined;
}

const Notification: React.FC<NotificationProps> = ({ userIdea }) => {
    const [isDismissed, setIsDismissed] = useState(false);
    const { user, token } = useContext(UserProfileContext);
    const dismissNotificationFunc = async (ideaId: number, token: string, userId: string, notification_dismissed: boolean) => {
        
        const updateData = await updateIdeaNotificationStatus(token, userId, ideaId.toString(), notification_dismissed);
        setIsDismissed(true)

    }

    return (

        <tr >
            {!isDismissed ? (
                <div className="d-flex align align-items-center">
                <><td>{"Your post named "} <h5>{userIdea?.title}</h5> {" has been removed from the conversations page due to violation of content"}</td>
                <div className="col-example text-left">
                    <Button onClick={async () => await dismissNotificationFunc(userIdea!.id, token!, user!.id, true)}>Dismiss</Button>
                </div></>
                </div>
            ) : (
                <div></div>
            )

            }
        </tr>
    );
}

export default Notification;