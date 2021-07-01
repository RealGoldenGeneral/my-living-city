import axios from "axios";
import { API_BASE_URL } from "../constants";
import { IRegisterInput } from "../types/input/register.input";
import { getAxiosJwtRequestOption } from "./axiosRequestOptions";
import { IUserSegments } from "../types/data/userSegment.type";
import { ISegment, ISubSegment } from "../types/data/segment.type";

export const postUserSegmentInfo = async (registerData: IRegisterInput, token:string) => {
    const { 
        homeSegmentId,
        workSegmentId,
        schoolSegmentId,
        homeSubSegmentId,
        workSubSegmentId,
        schoolSubSegmentId,
    } = registerData;
    // Verify Payload
    if (!homeSegmentId) {
        throw new Error("You must provide an email and password to sign up.")
    }

    const res = await axios.post(`${API_BASE_URL}/userSegment/create`, {
        homeSegmentId,
        workSegmentId,
        schoolSegmentId,
        homeSubSegmentId,
        workSubSegmentId,
        schoolSubSegmentId
    }, getAxiosJwtRequestOption(token));
    // const res = await axios({
    //     method: "post",
    //     url: `${API_BASE_URL}/userSegment/create`,
    //     data: { 
    //         homeSegmentId,
    //         workSegmentId,
    //         schoolSegmentId,
    //         homeSubSegmentId,
    //         workSubSegmentId,
    //         schoolSubSegmentId
    //     },getAxiosJwtRequestOption(token),
    // })
    return res.data;
}

// Get userSegment info with IDs
export const getMySegmentInfo = async (token:string | null) => {
    const res = await axios.get<IUserSegments>(`${API_BASE_URL}/userSegment/getMySegment`, getAxiosJwtRequestOption(token!));
    return res.data;
}

// Get userSegment name from relational table
export const getMyHomeSegment = async (token:string | null) => {
    const res = await axios.get<ISegment>(`${API_BASE_URL}/userSegment/homeSegment`, getAxiosJwtRequestOption(token!));
    return res.data;
}

export const getMyWorkSegment = async (token:string | null) => {
    const res = await axios.get<ISegment>(`${API_BASE_URL}/userSegment/workSegment`, getAxiosJwtRequestOption(token!));
    return res.data;
}

export const getMySchoolSegment = async (token:string | null) => {
    const res = await axios.get<ISegment>(`${API_BASE_URL}/userSegment/schoolSegment`, getAxiosJwtRequestOption(token!));
    return res.data;
}

// Get userSubSegment name from relational table
export const getMyHomeSubSegment = async (token:string | null) => {
    const res = await axios.get<ISubSegment>(`${API_BASE_URL}/userSegment/homeSubSegment`, getAxiosJwtRequestOption(token!));
    return res.data;
}

export const getMyWorkSubSegment = async (token:string | null) => {
    const res = await axios.get<ISubSegment>(`${API_BASE_URL}/userSegment/workSubSegment`, getAxiosJwtRequestOption(token!));
    return res.data;
}

export const getMySchoolSubSegment = async (token:string | null) => {
    const res = await axios.get<ISubSegment>(`${API_BASE_URL}/userSegment/schoolSubSegment`, getAxiosJwtRequestOption(token!));
    return res.data;
}