import { useQuery } from "react-query"
import { getUserHomeSegmentInfo } from "src/lib/api/userSegmentRoutes"
import { ISegment, ISubSegment } from "src/lib/types/data/segment.type"
import { ICategory } from "../lib/types/data/category.type"
import { IFetchError } from "../lib/types/types"
export const useAllUserSegments = (token: string | null) => {
    return useQuery<any, IFetchError>(
      ['segments', token],
      () => getUserHomeSegmentInfo(token),
    )
  }

