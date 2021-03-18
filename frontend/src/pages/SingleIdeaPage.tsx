import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import SingleIdeaPageContent from '../components/content/SingleIdeaPageContent';
import useSingleIdea from '../hooks/useSingleIdea'

// TODO: Pages are responsible for fetching, error handling, and loading spinner

// Extends Route component props with idea title route param
interface SingleIdeaPageProps extends RouteComponentProps<{
  ideaId: string
}> {
  // Add custom added props here 
}

const SingleIdeaPage: React.FC<SingleIdeaPageProps> = (props) => {
  // Destructured props
  const { match: { params: { ideaId } } } = props;

  const { data, error, isLoading, isError } = useSingleIdea(ideaId);

  // Guard condition if data is loading
  if (isLoading) {
    return (
      <div className="wrapper">
        <h1>Loading spinner here...</h1>
      </div>
    )
  }

  // Guard condition if error during fetch
  if (isError) {
    return (
      <div className="wrapper">
        <h1>Could not retrieve idea with id { ideaId }</h1>
        {JSON.stringify(error)}
      </div>
    )
  }

  return (
    <div className="wrapper">
      <SingleIdeaPageContent ideaData={ data! } />
    </div>
  )
}

export default SingleIdeaPage