import DashboardPageContent from "../components/content/DashboardPageContent";
import { useIdeasHomepage } from "../hooks/ideaHooks";
export default function DashboardPage() {
  const { data, isLoading, error, isError } = useIdeasHomepage();
  return (
    <div className="wrapper">
      <DashboardPageContent
        topIdeas={data}
        ideasLoading={isLoading}
        ideasIsError={isError}
        ideasError={error}
      />
    </div>
  );
}
