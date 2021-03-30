import React from 'react'
import RegisterPageContent from '../components/content/RegisterPageContent'
import useUserRoles from '../hooks/roles/useUserRoles';

export default function RegisterPage() {

  // Fetch User Roles
  const { data, error, isLoading } = useUserRoles();

  return (
    <div className="wrapper">
      <RegisterPageContent userRoles={ data }/>
    </div>
  )
}
