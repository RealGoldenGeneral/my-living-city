import React, { useContext } from 'react'
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { UserProfileContext } from '../contexts/UserProfile.Context';

interface ProfilePageProps {
  
}

const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const { user, loading, errorOccured, error } = useContext(UserProfileContext)

  if (loading) {
    return (
      <div className="wrapper">
        <LoadingSpinner />
      </div>
    )
  }

  if (errorOccured) {
    <div className="wrapper">
      {JSON.stringify(error)}
    </div>
  }

  return (
    <div className="wrapper">
      <h2>User Profile</h2>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}

export default ProfilePage