import { useQuery } from "react-query"
import { IUserSegments } from "../lib/types/data/userSegment.type"
import { IFetchError } from "../lib/types/types"
import { getMySegmentInfo } from "src/lib/api/userSegmentRoutes" 

export const useUserSegments = (token: string | null) => {
  return useQuery<IUserSegments, IFetchError>(
    ['userSegments', token], 
    () => getMySegmentInfo(token),
  )
}

// export const useUse = (categoryId: string) => {
//   return useQuery<ICategory, IFetchError>(
//     ['category', categoryId],
//     () => getSingleCategory(categoryId),
//   )
// }