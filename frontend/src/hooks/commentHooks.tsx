import axios from 'axios'
import react from 'react'
import { useMutation, useQuery } from 'react-query'
import { getAxiosJwtRequestOption } from '../lib/api/axiosRequestOptions'
import { getAllComments, getCommentsUnderIdea } from '../lib/api/commentRoutes'
import { API_BASE_URL } from '../lib/constants'
import { queryClient } from '../lib/react-query/clientInitializer'
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
  )
}

export const useCreateCommentMutation = (
  token: string | null,
  ideaId: number,
) => {
  return useMutation<Comment, FetchError, CreateCommentInput>(
    newComment => axios.post(
      `${API_BASE_URL}/comment/create/${ideaId}`,
      { content: newComment.content },
      getAxiosJwtRequestOption(token!)
    )
  )
}

// // https://stackoverflow.com/questions/65760158/react-query-mutation-typescript
// export const useCreateCommentMutation = (
//   token: string,
// ) => {
//   return useMutation(
//     newComment => axios.post(
//       `${API_BASE_URL}/comment/create/1`,
//       { content: "test" },
//       getAxiosJwtRequestOption(token)
//     )
//   )
// }

// export const useCreateCommentMutation = (
//   ideaId: number,
//   token: string | null | undefined,
//   commentPayload: CreateCommentInput,
//   shouldTrigger?: boolean,
// ) => {
//   return useMutation()
// }