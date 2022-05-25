import { RouteComponentProps } from "react-router-dom";
import CommunityDashboardContent from "./../components/content/CommunityDashboardContent";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useSegmentInfoAggregate, useSingleSegmentBySegmentId } from "./../hooks/segmentHooks";
import { useIdeasHomepage } from "src/hooks/ideaHooks";
import { IIdeaWithAggregations } from "src/lib/types/data/idea.type";


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

    const {data: segmentAggregatData,
            error, 
            isLoading: isAggregateLoading, 
            isError: isAggregateError
        } = useSegmentInfoAggregate(parseInt(segId));
    const {data: segmentInfoData,
        error: segmentInfoError,
        isLoading: isSegmentInfoLoading,
        isError: isSegmentInfoError,
        } = useSingleSegmentBySegmentId(parseInt(segId));

    const {
        data: iData,
        error: iError,
        isLoading: iLoading,
        isError: iIsError,
        } = useIdeasHomepage();
    
    if (isAggregateError || isSegmentInfoError || iError) {
        return (
          <div className="wrapper">
            <p>
              Error occured while trying to retrieve community info. Please try again later.
            </p>
          </div>
        );
    }

    if (isAggregateLoading || isSegmentInfoLoading || iLoading) {
        return (
          <div className="wrapper">
            <LoadingSpinner />
          </div>
        );
    }

    const filteredTopIdeas = () => {
        const segmentId = segmentInfoData?.segId;
        const filteredTopIdeas: IIdeaWithAggregations[] = [];
        iData && iData.forEach(idea => {
            if (idea.segId && idea.segId === segmentId) {
                filteredTopIdeas.push(idea);
            }
        });
        return filteredTopIdeas;
    }

    return (
        <>
            <div className="wrapper">
                <CommunityDashboardContent topIdeas={filteredTopIdeas()} data={segmentAggregatData!} segmenData={segmentInfoData!} />
            </div>
        </>
    );
}

export default CommunityDashboardPage;