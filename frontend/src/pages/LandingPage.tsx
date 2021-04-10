import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import LandingPageContent from '../components/content/LandingPageContent'
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useIdeasWithBreakdown, useIdeasWithSort, useIdeasHomepage} from '../hooks/ideaHooks'
import { queryCache } from '../lib/react-query/clientInitializer';

export default function LandingPage() {
  const { data, isLoading, error, isError } = useIdeasHomepage();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log(queryClient.getQueryData('ideas-homepage'))
  }, [isLoading, isError])
  return (
    <div className="wrapper">
      <LandingPageContent 
        topIdeas={data} 
        ideasLoading={isLoading}
        ideasIsError={isError}
        ideasError={error}
      />
    </div>
  )
}
