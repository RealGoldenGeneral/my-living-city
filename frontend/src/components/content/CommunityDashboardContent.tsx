import React from "react";
import { IUser } from "src/lib/types/data/user.type";
import {ISegmentAggregateInfo} from "./../../lib/types/data/segment.type";

interface CommunityDashboardContentProps {
    data: ISegmentAggregateInfo,
    // user: IUser,
    // token: string,
}

const CommunityDashboardContent: React.FC<CommunityDashboardContentProps> = ({data} : CommunityDashboardContentProps) => {
    console.log(data);
    return (
        <div>
            <h1>{data.superSegmentName}</h1>
        </div>
    )
}

export default CommunityDashboardContent;