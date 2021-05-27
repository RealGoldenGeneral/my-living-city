import { useQuery } from "react-query"
import { ISegment } from "../lib/types/data/segment.type"
import { IFetchError } from "../lib/types/types"
import { getAllSegments} from "../lib/api/segmentRoutes"

export const useAllSegments= () => {
    return useQuery<ISegment[], IFetchError>('segments', getAllSegments,);
}
// export const useAllSegments = () => {
//     return useQuery<ISegment[], IFetchError>(
//       'name', 
//       getAllSegments(),
//     );
//   }