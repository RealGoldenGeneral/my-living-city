import ConversationsPageContent from '../components/content/ConversationsPageContent';
import IdeaTile from '../components/tiles/IdeaTile'
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useIdeas } from '../hooks/ideaHooks';


export default function ConversationsPage() {
  const { data, error, isLoading, isError } = useIdeas();

  if (isLoading) {
    return (
      <div className="wrapper">
        <LoadingSpinner />
      </div>
    )
  }

  if (isError) {
    console.log(error);
    return (
      <div className="wrapper">
        <h2>Error</h2>
      </div>
    )
  }

  return (
    <>
      <div className="wrapper">
        <ConversationsPageContent ideas={data} />
      </div>
    </>
  )
}
