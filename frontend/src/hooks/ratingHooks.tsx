import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { getAxiosJwtRequestOption } from "src/lib/api/axiosRequestOptions"
import { API_BASE_URL } from "src/lib/constants"
import { IUser } from "src/lib/types/data/user.type"
import { CreateRatingInput } from "../lib/types/input/createRating.input"
import { getAllRatingsUnderIdea, getAllRatingsUnderIdeaWithAggregations } from "../lib/api/ratingRoutes"
import { Rating, RatingAggregateResponse } from "../lib/types/data/rating.type"
import { FetchError } from "../lib/types/types"

export const useAllRatingsUnderIdea = (ideaId: string) => {
  return useQuery<Rating[], FetchError>(
    ['ratings', ideaId],
    () => getAllRatingsUnderIdea(ideaId),
  )
}


export const useAllRatingsUnderIdeaWithAggregations = (ideaId: string) => {
  return useQuery<RatingAggregateResponse, FetchError>(
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

  const ratingMutation = useMutation<Rating, FetchError, CreateRatingInput>(
    (newRating) => axios.post(
      `${API_BASE_URL}/rating/create/${ideaId}`,
      newRating,
      getAxiosJwtRequestOption(token!),
    ),
    {
      onMutate: async (newRating) => {
        const { id: userId } = user!;

        // Snapshot previous value
        const previousRatings = queryClient.getQueryData<Rating[]>(previousRatingsKey);

        // Cancel outgoing refreshes
        await queryClient.cancelQueries(previousRatingsKey);

        // Optimistically update to new value
        if (previousRatings) {
          queryClient.setQueryData<Rating[]>(
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
          queryClient.setQueryData<Rating[]>(previousRatingsKey, context);
        }
      },
      onSettled: async () => {
        queryClient.invalidateQueries(previousRatingsKey);
      },
    }
  )

  const submitRatingMutation = (ratingInput: CreateRatingInput) => {
    ratingMutation.mutate(ratingInput);
    // ratingMutation.mutate()
  }

  return {
    ...ratingMutation,
    submitRatingMutation,
  }
}