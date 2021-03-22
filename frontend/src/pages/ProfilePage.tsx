import React, { useContext } from 'react'
import { UserProfileContext } from '../contexts/UserProfile.Context';

interface ProfilePageProps {
  
}

const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const { user, loading, errorOccured, error } = useContext(UserProfileContext)

  if (loading) {
    return <p>Loading...</p>
  }

  if (errorOccured) {
    return <p>{JSON.stringify(error)}</p>
  }

  return (
    <div className="wrapper">
      <h2>User Profile</h2>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}

export default ProfilePage