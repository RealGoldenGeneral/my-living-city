import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import SingleIdeaPageContent from '../components/content/SingleIdeaPageContent';
import { useSingleIdea } from '../hooks/ideaHooks'

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

  const { data, error, isLoading, isError, status } = useSingleIdea(ideaId);

  if (isError) {
    console.error(error);
  }

  return (
    <div className="wrapper">
      {isError && (
        <>
        <p>{error!.message}</p>
        <p>Error fetching: {JSON.stringify(error)}</p>
        </>
      )}
      {isLoading && <h2>Fetching data...</h2>}
      {status === 'success' && (
        <SingleIdeaPageContent ideaData={ data! } />
      )}
    </div>
  )
}

export default SingleIdeaPage