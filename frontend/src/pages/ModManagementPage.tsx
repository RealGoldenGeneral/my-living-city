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
import { useAllFlags } from 'src/hooks/flagHooks';
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
  const { data: flagData, isLoading: flagLoading} = useAllFlags(token);

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
  if(flagData){
    console.log("flags");
    console.log(flagData);
    console.log("flags");
  }

  if(ideaData && userData && proposalData && commentData && flagData){
      quarantineIdea = ideaData.filter(idea => idea.reviewed === false && idea.active === false);
      quarantineComment = commentData.filter(comment => comment.reviewed === false && comment.active === false);
      quarantineProposal = proposalData.filter(proposal => proposal.idea.reviewed === false && proposal.idea.active === false);
      quarantineUser = userData.filter(user => user.reviewed === false && user.banned === true);
  }


  // TODO: Create non blocking error handling
  if(pageState === "quarantine"){
    return (
      <div className="wrapper">
      <div style={{position: 'sticky', top: 100}}>
      <Button style={{position: 'absolute', top:0, left:'-17%', width: 165, textAlign: 'left' }} onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}>Dashboard</Button>
        <br></br>
        <Button style={{position: 'absolute', top:40, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("quarantine")}>Quarantine List</Button>
        <Button style={{position: 'absolute', top:80, left:'-17%', width: 165, textAlign: 'left' }} className='mt-4 mr-2 display-6' onClick={() => loadState("user")}>User View</Button>
        <Button style={{position: 'absolute', top:120, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("idea")}>Idea View</Button>
        <Button style={{position: 'absolute', top:160, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("proposal")}>Proposal View</Button>
        <Button style={{position: 'absolute', top:200, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("comment")}>Comment View</Button>
      </div>
      <UserManagementContent users={quarantineUser!} token={token} user={user}/>
      <br></br>
      <IdeaManagementContent users={userData!} token={token} user={user} ideas={quarantineIdea!} flags={flagData}/>
      <br></br>
      <ProposalManagementContent users={userData!} token={token} user={user} proposals={quarantineProposal!} ideas={quarantineIdea!} flags={flagData}/>
      <br></br>
      <CommentManagementContent users={userData!} token={token} user={user} comments={quarantineComment} ideas={ideaData!}/>
      
    </div>
    );
  }
  if(pageState ==="user"){
    return (
      <div className="wrapper">
        <div style={{position: 'sticky', top: 100}}>
        <Button style={{position: 'absolute', top:0, left:'-17%', width: 165, textAlign: 'left' }} onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}>Dashboard</Button>
        <br></br>
        <Button style={{position: 'absolute', top:40, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("quarantine")}>Quarantine List</Button>
        <Button style={{position: 'absolute', top:80, left:'-17%', width: 165, textAlign: 'left' }} className='mt-4 mr-2 display-6' onClick={() => loadState("user")}>User View</Button>
        <Button style={{position: 'absolute', top:120, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("idea")}>Idea View</Button>
        <Button style={{position: 'absolute', top:160, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("proposal")}>Proposal View</Button>
        <Button style={{position: 'absolute', top:200, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("comment")}>Comment View</Button>
      </div>
        <UserManagementContent users={userData!} token={token} user={user}/>
      </div>
    );
  }
  if(pageState ==="idea"){
    return (
      <div className="wrapper">
        <div style={{position: 'sticky', top: 100}}>
        <Button style={{position: 'absolute', top:0, left:'-17%', width: 165, textAlign: 'left' }} onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}>Dashboard</Button>
        <br></br>
        <Button style={{position: 'absolute', top:40, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("quarantine")}>Quarantine List</Button>
        <Button style={{position: 'absolute', top:80, left:'-17%', width: 165, textAlign: 'left' }} className='mt-4 mr-2 display-6' onClick={() => loadState("user")}>User View</Button>
        <Button style={{position: 'absolute', top:120, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("idea")}>Idea View</Button>
        <Button style={{position: 'absolute', top:160, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("proposal")}>Proposal View</Button>
        <Button style={{position: 'absolute', top:200, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("comment")}>Comment View</Button>
      </div>
        <IdeaManagementContent users={userData!} token={token} user={user} ideas={ideaData!} flags={flagData}/>
  
      </div>
    );
  }
  if(pageState ==="proposal"){
    return (
      <div className="wrapper">
        <div style={{position: 'sticky', top: 100}}>
        <Button style={{position: 'absolute', top:0, left:'-17%', width: 165, textAlign: 'left' }} onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}>Dashboard</Button>
        <br></br>
        <Button style={{position: 'absolute', top:40, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("quarantine")}>Quarantine List</Button>
        <Button style={{position: 'absolute', top:80, left:'-17%', width: 165, textAlign: 'left' }} className='mt-4 mr-2 display-6' onClick={() => loadState("user")}>User View</Button>
        <Button style={{position: 'absolute', top:120, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("idea")}>Idea View</Button>
        <Button style={{position: 'absolute', top:160, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("proposal")}>Proposal View</Button>
        <Button style={{position: 'absolute', top:200, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("comment")}>Comment View</Button>
      </div>
        <ProposalManagementContent users={userData!} token={token} user={user} proposals={proposalData!} ideas={propIdeaData!} flags={flagData}/>
  
      </div>
    );
  }
  if(pageState ==="comment"){
    return (
      <div className="wrapper">
        <div style={{position: 'sticky', top: 100}}>
        <Button style={{position: 'absolute', top:0, left:'-17%', width: 165, textAlign: 'left' }} onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}>Dashboard</Button>
        <br></br>
        <Button style={{position: 'absolute', top:40, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("quarantine")}>Quarantine List</Button>
        <Button style={{position: 'absolute', top:80, left:'-17%', width: 165, textAlign: 'left' }} className='mt-4 mr-2 display-6' onClick={() => loadState("user")}>User View</Button>
        <Button style={{position: 'absolute', top:120, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("idea")}>Idea View</Button>
        <Button style={{position: 'absolute', top:160, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("proposal")}>Proposal View</Button>
        <Button style={{position: 'absolute', top:200, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("comment")}>Comment View</Button>
      </div>
        <CommentManagementContent users={userData!} token={token} user={user} comments={commentData} ideas={ideaData!}/>
  
      </div>
    );
  }
  return (
    <div className="wrapper">
        <div style={{position: 'sticky', top: 100}}>
        <Button style={{position: 'absolute', top:0, left:'-17%', width: 165, textAlign: 'left' }} onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}}>Dashboard</Button>
        <br></br>
        <Button style={{position: 'absolute', top:0, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("quarantine")}>Quarantine List</Button>
        <Button style={{position: 'absolute', top:40, left:'-17%', width: 165, textAlign: 'left' }} className='mt-4 mr-2 display-6' onClick={() => loadState("user")}>User View</Button>
        <Button style={{position: 'absolute', top:80, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("idea")}>Idea View</Button>
        <Button style={{position: 'absolute', top:120, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("proposal")}>Proposal View</Button>
        <Button style={{position: 'absolute', top:160, left:'-17%', width: 165, textAlign: 'left'}} className='mt-4 mr-2 display-6' onClick={() => loadState("comment")}>Comment View</Button>
      </div>
      <UserManagementContent users={userData!} token={token} user={user}/>
      <br></br>
      <IdeaManagementContent users={userData!} token={token} user={user} ideas={ideaData!} flags={flagData}/>
      <br></br>
      <ProposalManagementContent users={userData!} token={token} user={user} proposals={proposalData!} ideas={propIdeaData!} flags={flagData}/>
      <br></br>
      <CommentManagementContent users={userData!} token={token} user={user} comments={commentData} ideas={ideaData!}/>

      
    </div>
  );
}

export default ModManagementPage