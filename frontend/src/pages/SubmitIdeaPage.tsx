import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { UserProfileContext } from 'src/contexts/UserProfile.Context';
import { useUserSegments } from 'src/hooks/userSegmentsHooks';
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
  const userData = useUserSegments(token); // tick
  // console.log(userData);

  if (isLoading || userData.isLoading) {
    <div className="wrapper">
      <LoadingSpinner />
    </div>
  }

  // TODO: Create non blocking error handling

  return (
    <div className="wrapper">
      <SubmitIdeaPageContent categories={data} userSegments={userData.data}/>
    </div>
  );
}

export default SubmitIdeaPage