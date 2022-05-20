import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { UserProfileContext } from 'src/contexts/UserProfile.Context';
import { USER_TYPES } from 'src/lib/constants';
import { ISegment } from 'src/lib/types/data/segment.type';
import { delay } from 'src/lib/utilityFunctions';
import SubmitAdvertisementPageContent from '../components/content/SubmitAdvertisementPageContent';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCategories } from '../hooks/categoryHooks';
import { getAllSegments, getUserReachSegmentsByUserId} from "./../lib/api/segmentRoutes";

// Extends Route component props with advertisement title route param
interface SubmitAdvertisementPageProps extends RouteComponentProps<{}> {
    // Add custom added props here 
}

const SubmitAdvertisementPage: React.FC<SubmitAdvertisementPageProps> = ({}) => {
    const { isLoading, error, isError } = useCategories();
    const { token, user } = useContext(UserProfileContext);
    // const { data } = useAllSegments();
    const [segmentData, setSegmentData] = useState<ISegment[]>([]);

    useEffect(() => {
      async function getSegmentData() {
        let data;
        if (user?.userType === USER_TYPES.ADMIN) {data = await getAllSegments()}
        else {await delay(1000); data = await getUserReachSegmentsByUserId(user?.id, token)}
        setSegmentData(data);
      }
      
      getSegmentData();
    }, []);
  
    if (isLoading) {
      return(
        <div className="wrapper">
        <LoadingSpinner />
        </div>
      )

    }
  
    // TODO: Create non blocking error handling
  
    return (
      <div className="wrapper">
        <SubmitAdvertisementPageContent segmentOptions={segmentData}/>
      </div>
    );
  }
  
  export default SubmitAdvertisementPage;