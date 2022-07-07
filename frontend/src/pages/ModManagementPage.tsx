import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { UserManagementContent } from 'src/components/content/UserManagementContent';
import { IdeaManagementContent } from 'src/components/content/IdeaManagementContent';
import { UserProfileContext } from '../contexts/UserProfile.Context';
import { useAllUsers } from 'src/hooks/userHooks';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCategories } from '../hooks/categoryHooks';
import { CacheProvider } from '@emotion/react';
import { ProposalManagementContent } from 'src/components/content/ProposalManagementContent';
import { CommentManagementContent } from 'src/components/content/CommentManagementContent';
import { useIdeasWithBreakdown } from 'src/hooks/ideaHooks';
import { useProposalsWithBreakdown } from 'src/hooks/proposalHooks';
import { IIdeaWithAggregations } from 'src/lib/types/data/idea.type';
import { useAllComments } from 'src/hooks/commentHooks';

// Extends Route component props with idea title route param
interface ModManagementProps extends RouteComponentProps<{}> {
  // Add custom added props here 
}

const ModManagementPage: React.FC<ModManagementProps> = ({}) => {
  const { token } = useContext(UserProfileContext);
  const {user} = useContext(UserProfileContext) 

  const { data: userData, isLoading: userLoading} = useAllUsers(token);
  const { data: ideaData, isLoading: ideaLoading} = useIdeasWithBreakdown(20);
  const { data: proposalData, isLoading: proposalLoading} = useProposalsWithBreakdown(20);
  const { data: commentData, isLoading: commentLoading} = useAllComments();

  let propIdeaData: IIdeaWithAggregations[] = []

  if (userLoading || ideaLoading || proposalLoading || commentLoading) {
    return(
      <div className="wrapper">
      <LoadingSpinner />
      </div>
    )

  }
  if(ideaData){
    propIdeaData = ideaData;
  }
  // TODO: Create non blocking error handling

  return (
    <div className="wrapper">
      <UserManagementContent users={userData!} token={token} user={user}/>
      <br></br>
      <IdeaManagementContent users={userData!} token={token} user={user} ideas={ideaData!}/>
      <br></br>
      <ProposalManagementContent users={userData!} token={token} user={user} proposals={proposalData!} ideas={propIdeaData!}/>
      <br></br>
      <CommentManagementContent users={userData!} token={token} user={user} comments={commentData} ideas={ideaData!}/>

      
    </div>
  );
}

export default ModManagementPage