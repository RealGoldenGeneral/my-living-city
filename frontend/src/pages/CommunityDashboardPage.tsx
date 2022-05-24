import { RouteComponentProps } from "react-router-dom";
import CommunityDashboardContent from "./../components/content/CommunityDashboardContent";
import {ISegmentAggregateInfo} from "./../lib/types/data/segment.type";
import LoadingSpinner from "../components/ui/LoadingSpinner";


interface CommunityDashboardPageProps extends RouteComponentProps<{
    segId: string;
}>{}

const CommunityDashboardPage: React.FC<CommunityDashboardPageProps> = (props) => {
    // Destructure props
    const {
        match: {
            params: { segId },
        },
    } = props;

    const testAggregateData: ISegmentAggregateInfo = {
        "residents": 1,
        "workers": 1,
        "students": 1,
        "ideas": 1,
        "proposals": 1,
        "projects": 1,
        "superSegmentName": "CRD",
        "subSegmentsCount": 2,
        "subSegments": ["Test1", "Test2"],
    };
    // const isError = true;
    // const isLoading = true;

    // const {data: segmentAggregatData, error, isLoading, isError} =
    
    // if (isError) {
    //     return (
    //       <div className="wrapper">
    //         <p>
    //           Error occured while trying to retrieve community info. Please try again later.
    //         </p>
    //       </div>
    //     );
    // }

    // if (isLoading) {
    //     return (
    //       <div className="wrapper">
    //         <LoadingSpinner />
    //       </div>
    //     );
    // }

    return (
        <>
            <div className="wrapper">
                <CommunityDashboardContent data={testAggregateData} />
            </div>
        </>
    );
}

export default CommunityDashboardPage;