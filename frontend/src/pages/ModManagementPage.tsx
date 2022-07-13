import React, { useContext, useState } from 'react'
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
import { IUser } from 'src/lib/types/data/user.type';
import { IComment } from 'src/lib/types/data/comment.type';
import { IProposalWithAggregations } from 'src/lib/types/data/proposal.type';
import { Button } from 'react-bootstrap';

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

  const [pageState, setPageState] = useState<String>("quarantine");
  let propIdeaData: IIdeaWithAggregations[] = []
  let quarantineIdea : IIdeaWithAggregations[] = [];
  let quarantineComment : IComment[] = [];
  let quarantineProposal : IProposalWithAggregations[] = [];
  let quarantineUser : IUser[] = [];

  function loadState(state: String){
    setPageState(state);
  }
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

  if(ideaData && userData && proposalData && commentData){
      quarantineIdea = ideaData.filter(idea => idea.reviewed === false && idea.active === false);
      quarantineComment = commentData.filter(comment => comment.reviewed === false && comment.active === false);
      quarantineProposal = proposalData.filter(proposal => proposal.idea.reviewed === false && proposal.idea.active === false);
      quarantineUser = userData.filter(user => user.reviewed === false && user.banned === true);
  }
  // TODO: Create non blocking error handling
  if(pageState === "quarantine"){
    return (

      <div className="wrapper">
      <Button className='mt-4 mr-2 display-6' onClick={() => loadState("")}>Normal View</Button>
      <Button className='mt-4 mr-2 display-6' onClick={() => loadState("idea")}>Idea View</Button>
      <Button className='mt-4 mr-2 display-6' onClick={() => loadState("proposal")}>Proposal View</Button>
      <Button className='mt-4 mr-2 display-6' onClick={() => loadState("comment")}>Comment View</Button>
      <UserManagementContent users={quarantineUser!} token={token} user={user}/>
      <br></br>
      <IdeaManagementContent users={quarantineUser!} token={token} user={user} ideas={quarantineIdea!}/>
      <br></br>
      <ProposalManagementContent users={quarantineUser!} token={token} user={user} proposals={quarantineProposal!} ideas={quarantineIdea!}/>
      <br></br>
      <CommentManagementContent users={userData!} token={token} user={user} comments={quarantineComment} ideas={ideaData!}/>
      
    </div>
    );
  }
  if(pageState ==="user"){
    return (
      <div className="wrapper">
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("quarantine")}>Quarantine List</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("")}>Normal View</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("idea")}>Idea View</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("proposal")}>Proposal View</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("comment")}>Comment View</Button>
        <UserManagementContent users={userData!} token={token} user={user}/>
  
      </div>
    );
  }
  if(pageState ==="idea"){
    return (
      <div className="wrapper">
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("quarantine")}>Quarantine List</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("")}>Normal View</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("user")}>User View</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("proposal")}>Proposal View</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("comment")}>Comment View</Button>
        <IdeaManagementContent users={userData!} token={token} user={user} ideas={ideaData!}/>
  
      </div>
    );
  }
  if(pageState ==="proposal"){
    return (
      <div className="wrapper">
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("quarantine")}>Quarantine List</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("")}>Normal View</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("user")}>User View</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("idea")}>Idea View</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("comment")}>Comment View</Button>
        <ProposalManagementContent users={userData!} token={token} user={user} proposals={proposalData!} ideas={propIdeaData!}/>
  
      </div>
    );
  }
  if(pageState ==="comment"){
    return (
      <div className="wrapper">
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("quarantine")}>Quarantine List</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("")}>Normal View</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("user")}>User View</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("idea")}>Idea View</Button>
        <Button className='mt-4 mr-2 display-6' onClick={() => loadState("proposal")}>Proposal View</Button>
        <CommentManagementContent users={userData!} token={token} user={user} comments={commentData} ideas={ideaData!}/>
  
      </div>
    );
  }
  return (
    <div className="wrapper">
      <Button className='mt-4 mr-2 display-6' onClick={() => loadState("quarantine")}>Quarantine List</Button>
      <Button className='mt-4 mr-2 display-6' onClick={() => loadState("user")}>User View</Button>
      <Button className='mt-4 mr-2 display-6' onClick={() => loadState("idea")}>Idea View</Button>
      <Button className='mt-4 mr-2 display-6' onClick={() => loadState("proposal")}>Proposal View</Button>
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