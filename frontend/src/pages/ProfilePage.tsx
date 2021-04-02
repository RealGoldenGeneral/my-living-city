import React, { useContext } from 'react'
import ProfileContent from '../components/content/ProfileContent';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { UserProfileContext } from '../contexts/UserProfile.Context';
import { useUserWithJwtVerbose } from '../hooks/userHooks';

interface ProfilePageProps {
  
}

const ProfilePage: React.FC<ProfilePageProps> = ({}) => {
  const { token } = useContext(UserProfileContext)
  const { data: user, isLoading, isError, error } = useUserWithJwtVerbose({
    jwtAuthToken: token!,
    shouldTrigger: token != null
  });

  if (isLoading) {
    return (
      <div className="wrapper">
        <LoadingSpinner />
      </div>
    )
  }

  if (isError) {
    <div className="wrapper">
      {JSON.stringify(error)}
    </div>
  }

  return (
    <div className="wrapper">
      <ProfileContent user={user!} />
    </div>
  );
}

export default ProfilePage