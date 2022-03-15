import React from "react";
import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useSingleProposal } from "src/hooks/proposalHooks";
import {
  useSingleSegmentBySegmentId,
  useSingleSubSegmentBySubSegmentId,
} from "src/hooks/segmentHooks";
import { IIdeaWithRelationship } from "src/lib/types/data/idea.type";
import SingleProposalPageContent from "../components/content/SingleProposalPageContent";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useSingleIdea } from "../hooks/ideaHooks";

// TODO: Pages are responsible for fetching, error handling, and loading spinner

// Extends Route component props with idea title route param
interface SingleIdeaPageProps
  extends RouteComponentProps<{
    ideaId: string;
    proposalId: string;
  }> {
  // Add custom added props here
}

const SingleProposalPage: React.FC<SingleIdeaPageProps> = (props) => {
  // Destructured props
  const {
    match: {
      params: { proposalId },
    },
  } = props;

  const { data, error, isLoading, isError } = useSingleIdea("7");
  const {
    data: proposalData,
    error: proposalError,
    isLoading: proposalIsLoading,
    isError: proposalIsError,
  } = useSingleProposal(proposalId);
  // const segmentData = useSingleSegmentBySegmentId(data?.segmentId!);

  // const [subSegmentId, setSubSegmentId] = useState(data?.subSegmentId);

  // if (subSegmentId) {
  //   const subSegmentData = useSingleSubSegmentBySubSegmentId(subSegmentId);
  // } else {

  // }
  // const subSegmentData = useSingleSubSegmentBySubSegmentId(data?.subSegmentId!);

  if (isError) {
    console.log(error);
    return (
      <div className="wrapper">
        <p>
          Error occured while trying to retrieve proposal. Please try again
          later.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="wrapper">
      {data && (
        <SingleProposalPageContent
          ideaData={data}
          proposalData={proposalData}
        />
      )}
    </div>
  );
};

export default SingleProposalPage;
