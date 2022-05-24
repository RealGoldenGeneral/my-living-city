import { useQuery } from "react-query"
import { ISegment, ISubSegment, ISegmentRequest, ISuperSegment } from "../lib/types/data/segment.type"
import { IFetchError } from "../lib/types/types"
import { findSegmentRequests, getAllSegments, getSingleSegmentBySegmentId, getSingleSubSegmentBySubSegmentId, getAllSuperSegments} from "../lib/api/segmentRoutes"
import {getAllSubSegmentsWithId} from "../lib/api/segmentRoutes"

export const useAllSegments= () => {
    return useQuery<ISegment[], IFetchError>('segments', getAllSegments,);
}

export const useAllSuperSegments = () => {
    return useQuery<ISuperSegment[], IFetchError>('superSegments', getAllSuperSegments,);
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

export const useSingleSegmentBySegmentId = (segmentId: number) => {
    return useQuery<ISegment, IFetchError>(
        ['segmentId', segmentId],
        () => getSingleSegmentBySegmentId(segmentId),
    )
}

export const useSingleSubSegmentBySubSegmentId = (subSegmentId: number | undefined) => {
    return useQuery<ISubSegment, IFetchError>(
        ['subSegmentId', subSegmentId],
        () => getSingleSubSegmentBySubSegmentId(subSegmentId),
    )
}
