import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { getAxiosJwtRequestOption } from "src/lib/api/axiosRequestOptions"
import { API_BASE_URL } from "src/lib/constants"
import { IUser } from "src/lib/types/data/user.type"
import { ICreateRatingInput } from "../lib/types/input/createRating.input"
import { getAllRatingsUnderIdea, getAllRatingsUnderIdeaWithAggregations } from "../lib/api/ratingRoutes"
import { IRating, IRatingAggregateResponse } from "../lib/types/data/rating.type"
import { IFetchError } from "../lib/types/types"

export const useAllRatingsUnderIdea = (ideaId: string) => {
  return useQuery<IRating[], IFetchError>(
    ['ratings', ideaId],
    () => getAllRatingsUnderIdea(ideaId),
  )
}


export const useAllRatingsUnderIdeaWithAggregations = (ideaId: string) => {
  return useQuery<IRatingAggregateResponse, IFetchError>(
    ['ratings-aggregate', ideaId],
    () => getAllRatingsUnderIdeaWithAggregations(ideaId),
    {
      staleTime: 60 * 1000
    }
  )
}

export const useCreateRatingMutation = (
  ideaId: number,
  token: string | null,
  user: IUser | null,
) => {
  const previousRatingsKey = ['ratings', String(ideaId)];
  const queryClient = useQueryClient();

  const ratingMutation = useMutation<IRating, IFetchError, ICreateRatingInput>(
    (newRating) => axios.post(
      `${API_BASE_URL}/rating/create/${ideaId}`,
      newRating,
      getAxiosJwtRequestOption(token!),
    ),
    {
      onMutate: async (newRating) => {
        const { id: userId } = user!;

        // Snapshot previous value
        const previousRatings = queryClient.getQueryData<IRating[]>(previousRatingsKey);

        // Cancel outgoing refreshes
        await queryClient.cancelQueries(previousRatingsKey);

        // Optimistically update to new value
        if (previousRatings) {
          queryClient.setQueryData<IRating[]>(
            previousRatingsKey,
            [
              ...previousRatings,
              {
                id: Math.random(),
                authorId: userId,
                ideaId: ideaId,
                rating: newRating.rating,
                ratingExplanation: newRating.ratingExplanation,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            ]
          )
        }

        console.log(previousRatings);

        return previousRatings;
      },
      onError: (err, variables, context: any) => {
        if (context) {
          console.log("Error Context", context)
          queryClient.setQueryData<IRating[]>(previousRatingsKey, context);
        }
      },
      onSettled: async () => {
        queryClient.invalidateQueries(previousRatingsKey);
      },
    }
  )

  const submitRatingMutation = (ratingInput: ICreateRatingInput) => {
    ratingMutation.mutate(ratingInput);
    // ratingMutation.mutate()
  }

  return {
    ...ratingMutation,
    submitRatingMutation,
  }
}