import { useQuery } from "react-query"
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
  )
}
