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
  )
}

export const useCreateCommentMutation = (
  token: string | null,
  ideaId: number,
) => {
  const { user } = useContext(UserProfileContext);
  const queryClient = useQueryClient();
  const { fname, lname, email, id } = user!
  const previousCommentsKey = ['comments', ideaId];

  useEffect(() => {
    console.log(queryClient.getQueryData(previousCommentsKey))
  }, [ideaId]);

  return useMutation<Comment, FetchError, CreateCommentInput>(
    newComment => axios.post(
      `${API_BASE_URL}/comment/create/${ideaId}`,
      { content: newComment.content },
      getAxiosJwtRequestOption(token!)
    ),
    {
      onMutate: async (newComment) => {
        // snapshot previous value
        const previousComments = queryClient.getQueryData(previousCommentsKey);

        // Cancel outgoing refetches
        await queryClient.cancelQueries(previousCommentsKey);

        console.log(previousComments, "previous comments");


        // // Optimistically update to new value
        // if (previousComments) {
        //   queryClient.setQueryData<Comment[]>(previousCommentsKey, [
        //     ...previousComments,
        //     {
        //       id: Math.random(),
        //       ideaId,
        //       active: true,
        //       authorId: id,
        //       author: {
        //         email,
        //         fname: fname ?? '',
        //         lname: lname ?? '',
        //       },
        //       content: newComment.content,
        //       createdAt: new Date().toISOString(),
        //       updatedAt: new Date().toISOString(),
        //     }
        //   ])
        // };

        // console.log("previousu comments", previousComments);

        return previousComments
      },
      // onError: (err, variables, context: any) => {
      //   if (context) {
      //     queryClient.setQueryData<Comment[]>(['comments', ideaId], context.previousComments);
      //   }
      // },
      // onSettled: () => {
      //   queryClient.invalidateQueries(['comments', ideaId])
      // }
    }
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