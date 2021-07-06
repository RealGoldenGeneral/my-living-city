import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { UserMangementContent } from 'src/components/content/UserMangementContent';
import { useAllUsers } from 'src/hooks/userHooks';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useCategories } from '../hooks/categoryHooks';
// Extends Route component props with idea title route param
interface UserManagementProps extends RouteComponentProps<{}> {
  // Add custom added props here 
}

const UserManagementPage: React.FC<UserManagementProps> = ({}) => {
  const { data, isLoading} = useAllUsers();
  console.log(data);

  if (isLoading) {
    <div className="wrapper">
      <LoadingSpinner />
    </div>
  }

  // TODO: Create non blocking error handling

  return (
    <div className="wrapper">
      <UserMangementContent users={data}/>
    </div>
  );
}

export default UserManagementPage