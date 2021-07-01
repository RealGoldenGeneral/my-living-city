import React, { useContext, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { UserProfileContext } from 'src/contexts/UserProfile.Context';
import { useUserHomeSegments, useUserHomeSubSegments, useUserSchoolSegments, useUserSchoolSubSegments, useUserSegments, useUserWorkSegments, useUserWorkSubSegments } from 'src/hooks/userSegmentsHooks';
import { ISegment } from 'src/lib/types/data/segment.type';
import SubmitIdeaPageContent from '../components/content/SubmitIdeaPageContent';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCategories } from '../hooks/categoryHooks';


// Extends Route component props with idea title route param
interface SubmitIdeaPageProps extends RouteComponentProps<{}> {
  // Add custom added props here 
}

const SubmitIdeaPage: React.FC<SubmitIdeaPageProps> = ({}) => {
  const { data, isLoading, error, isError } = useCategories();

  const { token } = useContext(UserProfileContext); // tick

  const userHomeSegmentData = useUserHomeSegments(token);
  const userWorkSegmentData = useUserWorkSegments(token);
  const userSchoolSegmentData = useUserSchoolSegments(token);
  const userHomeSubSegmentData = useUserHomeSubSegments(token);
  const userWorkSubSegmentData = useUserWorkSubSegments(token);
  const userSchoolSubSegmentData = useUserSchoolSubSegments(token);

  const userSegmentDataArray = [userHomeSegmentData.data, userWorkSegmentData.data, userSchoolSegmentData.data];
  const userSubSegmentDataArray = [userHomeSubSegmentData.data, userWorkSubSegmentData.data, userSchoolSubSegmentData.data]
  
  //console.log(userHomeSegmentData.data);
  
  // const userData = useUserSegments(token); // tick
  // console.log(userData);

  if (isLoading || userHomeSegmentData.isLoading
                || userWorkSegmentData.isLoading
                || userSchoolSegmentData.isLoading
                || userHomeSubSegmentData.isLoading
                || userWorkSubSegmentData.isLoading) { // if (isLoading || userData.isLoading) {
    <div className="wrapper">
      <LoadingSpinner />
    </div>
  }

  // TODO: Create non blocking error handling
  // <SubmitIdeaPageContent categories={data} userSegments={userData.data}/>
  return (
    <div className="wrapper">
      <SubmitIdeaPageContent categories={data} segment={userSegmentDataArray} subSegment={userSubSegmentDataArray}/>
    </div>
  );
}

export default SubmitIdeaPage