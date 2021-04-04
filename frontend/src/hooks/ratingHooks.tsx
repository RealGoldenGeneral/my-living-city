import { useQuery } from "react-query"
import { getAllRatingsUnderIdea } from "../lib/api/ratingRoutes"
import { Rating } from "../lib/types/data/rating.type"
import { FetchError } from "../lib/types/types"

export const useAllRatingsUnderIdea = (ideaId: string) => {
  return useQuery<Rating[], FetchError>(
    ['ratings', ideaId],
    () => getAllRatingsUnderIdea(ideaId),
  )
}