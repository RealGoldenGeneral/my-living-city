export interface ISegment {
    segId: number;
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