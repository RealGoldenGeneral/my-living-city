import React from 'react'
import { useQuery } from 'react-query'
import { useIdeas } from '../hooks/ideaHooks';


export default function IdeasPage() {
  const { data, error, isLoading, isError } = useIdeas();

  if (isLoading) {
    return (
      <div className="wrapper">
        <h2>Loading...</h2>
      </div>
    )
  }

  if (isError) {
    console.log(error);
    return (
      <div className="wrapper">
        <h2>Error</h2>
      </div>
    )
  }

  return (
    <>
      <div className="wrapper">
        <p>Ideas page</p>
        <p>{JSON.stringify(data)}</p>
      </div>
    </>
  )
}
