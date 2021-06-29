import { useQuery } from "react-query"
import { ISegment, ISubSegment, ISegmentRequest } from "../lib/types/data/segment.type"
import { IFetchError } from "../lib/types/types"
import { findSegmentRequests, getAllSegments} from "../lib/api/segmentRoutes"
import {getAllSubSegmentsWithId} from "../lib/api/segmentRoutes"
export const useAllSegments= () => {
    return useQuery<ISegment[], IFetchError>('segments', getAllSegments,);
}

export const useAllSubSegmentsWithId= (segId:string) => {
    return useQuery<ISubSegment[]>(
        ['subSegments', segId],
        () => getAllSubSegmentsWithId(segId),
    )

}
export const useAllSegmentRequests = (token: string | null) => {
    return useQuery<ISegmentRequest[]>(
        ['segRequests', token],
        () => findSegmentRequests(token),
    )
}
// export const useAllSegments = () => {
//     return useQuery<ISegment[], IFetchError>(
//       'name', 
//       getAllSegments(),
//     );
//   }