import axios from 'axios'
import react, { useContext, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { UserProfileContext } from '../contexts/UserProfile.Context'
import { getAxiosJwtRequestOption } from '../lib/api/axiosRequestOptions'
import { getAllComments, getCommentsUnderIdea } from '../lib/api/commentRoutes'
import { API_BASE_URL } from '../lib/constants'
import { Comment } from '../lib/types/data/comment.type'
import { CreateCommentInput } from '../lib/types/input/createComment.input'
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
    {
      staleTime: 60 * 1000 // 1 minute
    }
  )
}