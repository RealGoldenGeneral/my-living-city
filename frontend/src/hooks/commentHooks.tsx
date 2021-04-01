import react from 'react'
import { useQuery } from 'react-query'
import { getAllComments, getCommentsUnderIdea } from '../lib/api/commentRoutes'
import { Comment } from '../lib/types/data/comment.type'
import { FetchError } from '../lib/types/types'

export const useAllComments = () => {
  return useQuery<Comment[], FetchError>(
    'comments',
    getAllComments,
  )
}

export const useAllCommentsUnderIdea = (ideaId: string) => {
  return useQuery<Comment[], FetchError>(
    ['comments', ideaId],
    () => getCommentsUnderIdea(ideaId),
  )
}