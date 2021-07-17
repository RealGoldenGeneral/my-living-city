export interface ISegment {
    segId: number;
    superSegId: number;
    country: string;
    province: string;
    name: string;
    superSegName?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface ISubSegment {
    id: number;
    segId: number;
    name: string;
    lat: number;
    lon: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface ISegmentRequest {
    id: number;
    userId: string;
    country: string;
    province: string;
    segmentName: string;
    subSegmentName: string;
}