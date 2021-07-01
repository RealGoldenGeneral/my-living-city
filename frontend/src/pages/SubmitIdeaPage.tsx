import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import SubmitIdeaPageContent from '../components/content/SubmitIdeaPageContent';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCategories } from '../hooks/categoryHooks';

// Extends Route component props with idea title route param
interface SubmitIdeaPageProps extends RouteComponentProps<{}> {
  // Add custom added props here 
}

const SubmitIdeaPage: React.FC<SubmitIdeaPageProps> = ({}) => {
  const { data, isLoading, error, isError } = useCategories();

  if (isLoading) {
    <div className="wrapper">
      <LoadingSpinner />
    </div>
  }

  // TODO: Create non blocking error handling

  return (
    <div className="wrapper">
      <SubmitIdeaPageContent categories={data}/>
    </div>
  );
}

export default SubmitIdeaPage