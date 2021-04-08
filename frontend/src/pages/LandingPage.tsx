import LandingPageContent from '../components/content/LandingPageContent'
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useIdeasWithBreakdown, useIdeasWithSort } from '../hooks/ideaHooks'

export default function LandingPage() {
  const { data, isLoading, error, isError } = useIdeasWithBreakdown(3);
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
