import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAxiosJwtRequestOption } from '../lib/api/axiosRequestOptions'
import { API_BASE_URL } from '../lib/constants'
import { CreateCommentInput } from '../lib/types/input/createComment.input'
import { getAllComments, getCommentAggregateUnderIdea, getCommentsUnderIdea } from '../lib/api/commentRoutes'
import { Comment, CommentAggregateCount } from '../lib/types/data/comment.type'
import { FetchError } from '../lib/types/types'
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../lib/types/data/user.type'
import { useEffect, useState } from 'react'

export const useAllComments = () => {
  return useQuery<Comment[], FetchError>(
    'comments',
    getAllComments,
  )
}

export const useAllCommentsUnderIdea = (ideaId: string, token: string | null) => {
  return useQuery<Comment[], FetchError>(
    ['comments', ideaId],
    () => getCommentsUnderIdea(ideaId, token),
    {
      staleTime: 5 * 60 * 1000 // 5 minutes
    }
  )
}

export const useCommentAggregateUnderIdea = (ideaId: string) => {
  return useQuery<CommentAggregateCount, FetchError>(
    ['comment-aggregate', ideaId],
    () => getCommentAggregateUnderIdea(ideaId),
    {
      staleTime: 5 * 60 * 1000 // 5 minutes
    }
  )
}


// https://react-query.tanstack.com/guides/mutations#persist-mutations
// https://stackoverflow.com/questions/65760158/react-query-mutation-typescript
export const useCreateCommentMutation = (
  ideaId: number,
  token: string | null,
  user: IUser | null,
) => {
  const previousCommentsKey = ['comments', String(ideaId)];
  const previousCommentAggregateKey = ['comment-aggregate', String(ideaId)];
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation<Comment, FetchError, CreateCommentInput>(
    newComment => axios.post(
      `${API_BASE_URL}/comment/create/${ideaId}`,
      { content: newComment.content },
      getAxiosJwtRequestOption(token!),
    ),
    {
      onMutate: async (newComment) => {
        const { id: userId, fname, lname, email, address } = user!

        // snapshot previous value
        const previousCommentAggregate = 
          queryClient.getQueryData<CommentAggregateCount>(previousCommentAggregateKey);
        const previousComments = queryClient.getQueryData<Comment[]>(previousCommentsKey);

        // Cancel outgoing refetches
        await queryClient.cancelQueries(previousCommentAggregateKey);
        await queryClient.cancelQueries(previousCommentsKey);

        // Optimistically update aggregate value
        if (previousCommentAggregate) {
          queryClient.setQueryData<CommentAggregateCount>(previousCommentAggregateKey,
            {
              count: previousCommentAggregate.count + 1
            }
          )
        }

        // Optimistically update to new value
        if (previousComments) {
          queryClient.setQueryData<Comment[]>(previousCommentsKey,
            [
              ...previousComments,
              {
                id: Math.random(),
                ideaId: ideaId!,
                active: true,
                authorId: userId,
                author: {
                  id: uuidv4(),
                  email,
                  fname: fname ?? '',
                  lname: lname ?? '',
                  address: {
                    postalCode: address?.postalCode ?? '',
                    streetAddress: address?.streetAddress ?? '',
                  }
                },
                likes: [],
                dislikes: [],
                content: newComment.content,
                _count: {
                  dislikes: 0,
                  likes: 0,
                },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            ]
          )
        }
        console.log("Previous Comments", previousComments);
        return previousComments
      },
      onError: (err, variables, context: any) => {
        if (context) {
          queryClient.setQueryData<Comment[]>(previousCommentsKey, context);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(previousCommentsKey);
      }
    }
  )

  const submitComment = (newComment: CreateCommentInput) => {
    // console.log("submit");
    // console.log(newComment);
    createCommentMutation.mutate(newComment);
  }

  return {
    submitComment,
    ...createCommentMutation,
  };
}