import { useQuery } from "react-query"
import { IUserSegments } from "../lib/types/data/userSegment.type"
import { IFetchError } from "../lib/types/types"
import { getMyHomeSegment, getMyHomeSubSegment, getMySchoolSegment, getMySchoolSubSegment, getMySegmentInfo, getMyWorkSegment, getMyWorkSubSegment } from "src/lib/api/userSegmentRoutes" 
import { ISegment, ISubSegment } from "src/lib/types/data/segment.type"

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

export const useUserHomeSegments = (token: string | null) => {
    return useQuery<ISegment, IFetchError>(
        ['userHomeSegment', token],
        () => getMyHomeSegment(token),
    )
}

export const useUserWorkSegments = (token: string | null) => {
    return useQuery<ISegment, IFetchError>(
        ['userWorkSegment', token],
        () => getMyWorkSegment(token),
    )
}

export const useUserSchoolSegments = (token: string | null) => {
    return useQuery<ISegment, IFetchError>(
        ['userSchoolSegment', token],
        () => getMySchoolSegment(token),
    )
}

export const useUserHomeSubSegments = (token: string | null) => {
    return useQuery<ISubSegment, IFetchError>(
        ['userHomeSubSegment', token],
        () => getMyHomeSubSegment(token),
    )
}

export const useUserWorkSubSegments = (token: string | null) => {
    return useQuery<ISubSegment, IFetchError>(
        ['userWorkSubSegment', token],
        () => getMyWorkSubSegment(token),
    )
}

export const useUserSchoolSubSegments = (token: string | null) => {
    return useQuery<ISubSegment, IFetchError>(
        ['userSchoolSubSegment', token],
        () => getMySchoolSubSegment(token),
    )
}