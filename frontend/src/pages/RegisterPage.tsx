import React from 'react'
import RegisterPageContent from '../components/content/RegisterPageContent'
import useUserRoles from '../hooks/useUserRoles';

export default function RegisterPage() {

  // Fetch User Roles
  const { data, error, isLoading } = useUserRoles();

  if (isLoading) {
    return (
      <div className="wrapper">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="wrapper">
      <RegisterPageContent userRoles={ data }/>
    </div>
  )
}
