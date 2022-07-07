import ConversationsPageContent from "../components/content/ConversationsPageContent";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useProposalsWithBreakdown } from "src/hooks/proposalHooks";
import { useIdeasWithBreakdown } from "src/hooks/ideaHooks";

export default function ConversationsPage() {
  const {
    data: iData,
    error: iError,
    isLoading: iLoading,
    isError: iIsError,
  } = useIdeasWithBreakdown();
  const {
    data: pData,
    error: pError,
    isLoading: pLoading,
    isError: pIsError,
  } = useProposalsWithBreakdown();

  if (iError || pError) {
    console.log(iError);
    return (
      <div className="wrapper">
        <h2>Error</h2>
      </div>
    );
  }
  if(iData && pData){
    for(let i = 0; i < iData.length; i++){
      if(!iData[i].active){
        iData.splice(i, 1);
      }
    }
    for(let i = 0; i < pData.length; i++){
      if(!pData[i].idea.active){
        pData.splice(i, 1);
      }
    }
  }
  if(iLoading || pLoading){
      return (
        <div className="wrapper">
         <LoadingSpinner />
        </div>
      );
  }
  return (
    <>
      <div className="wrapper">
        <ConversationsPageContent ideas={iData} proposals={pData} />
      </div>
    </>
  );
}
