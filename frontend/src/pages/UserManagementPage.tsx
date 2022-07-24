import React, { useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { UserManagementContent } from 'src/components/content/UserManagementContent';
import { UserProfileContext } from '../contexts/UserProfile.Context';
import { useAllUsers } from 'src/hooks/userHooks';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCategories } from '../hooks/categoryHooks';
import { useAllCommentFlags, useAllFlags } from 'src/hooks/flagHooks';
import { IUser } from 'src/lib/types/data/user.type';
import { ICommentFlag, IFlag } from 'src/lib/types/data/flag.type';
import { UserManagementContentLegacy } from 'src/components/content/UserManagementContentLegacy';

// Extends Route component props with idea title route param
interface UserManagementPropsLegacy extends RouteComponentProps<{}> {
  // Add custom added props here 
  users: IUser[]; 
  token: string | null; 
  user: IUser | null;
  flags: IFlag[] | undefined;
  commentFlags: ICommentFlag | undefined;
}

const UserManagementPage: React.FC<UserManagementPropsLegacy> = ({}) => {
  const { token } = useContext(UserProfileContext);
  const {user} = useContext(UserProfileContext) 
  const { data: flagData, isLoading: flagLoading} = useAllFlags(token);
  const { data, isLoading} = useAllUsers(token);
  const {data: commentFlagData, isLoading: commentFlagLoading} = useAllCommentFlags(token);
  let flaggedUser: number[] = [];
  if (isLoading || flagLoading || commentFlagLoading) {
    return(
      <div className="wrapper">
      <LoadingSpinner />
      </div>
    )

  }

  // TODO: Create non blocking error handling

  return (
    <div className="wrapper">
      <UserManagementContentLegacy users={data!} token={token} user={user} flags={flagData} commentFlags={commentFlagData}/>
    </div>
  );
}

export default UserManagementPage