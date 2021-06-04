import { useQuery } from "react-query"
import { ISegment, ISubSegment } from "../lib/types/data/segment.type"
import { IFetchError } from "../lib/types/types"
import { getAllSegments} from "../lib/api/segmentRoutes"
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

// export const useAllSegments = () => {
//     return useQuery<ISegment[], IFetchError>(
//       'name', 
//       getAllSegments(),
//     );
//   }