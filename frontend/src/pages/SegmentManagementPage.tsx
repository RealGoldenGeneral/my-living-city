import React, { useContext } from 'react'
import { useAllSegments } from 'src/hooks/segmentHooks';
import { UserProfileContext } from '../contexts/UserProfile.Context';
import SegmentManagementContent from '../components/content/SegmentManagementContent';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import {useUserWithJwtVerbose} from 'src/hooks/userHooks';


export default function SegmentManagementPage() {

    // Fetch User Roles
    
    const { data, isLoading } = useAllSegments();
    const { token } = useContext(UserProfileContext)
    if (isLoading) {
      return (
        <div className="wrapper">
          <LoadingSpinner />
        </div>
      )
    }
  
    return (
      <div className="wrapper">
        <SegmentManagementContent segments={ data } token = {token}/>
      </div>
    )
  }
