import axios from "axios";
import { API_BASE_URL } from "../constants";
import { ISegment, ISubSegment } from "../types/data/segment.type";
import { IRegisterInput } from "../types/input/register.input";
import { getAxiosJwtRequestOption } from "./axiosRequestOptions";
export interface ISegData {
    segment: ISegment | null;
    subSegment: ISubSegment | null;
}
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
        throw new Error("You must have at least home segment to sign up!")
    }
    const res = await axios({
        method: "post",
        url: `${API_BASE_URL}/userSegment/create`,
        data: { 
            homeSegmentId,
            workSegmentId,
            schoolSegmentId,
            homeSubSegmentId,
            workSubSegmentId,
            schoolSubSegmentId
        },
        headers: {"Access-Control-Allow-Origin": "*", "x-auth-token": token},
        withCredentials: true
    })
    console.log(res.data);
    return res.data;
}
export const getMyUserSegmentInfo = async (token: string, userId: string) => {
    console.log(userId);
    const req = await axios.get(`${API_BASE_URL}/userSegment/getUserSegment/${userId}`,getAxiosJwtRequestOption(token!));
    console.log(req);
    return req.data;
}
export const getUserHomeSegmentInfo = async (token: string | null) => {
    const one = await axios.get(`${API_BASE_URL}/userSegment/homeSegment`,getAxiosJwtRequestOption(token!));
    const two = await axios.get(`${API_BASE_URL}/userSegment/homeSubSegment`,getAxiosJwtRequestOption(token!));
    const segData = axios.all([one, two]).then(axios.spread((...responses)=>{
        const segment = responses[0].data;
        const subSegment = responses[1].data;
        return {segment: segment, subSegment: subSegment};
    }))
    return segData;
}
export const getUserWorkSegmentInfo = async (token: string | null) => {
    const one = await axios.get(`${API_BASE_URL}/userSegment/workSegment`,getAxiosJwtRequestOption(token!));
    const two = await axios.get(`${API_BASE_URL}/userSegment/workSubSegment`,getAxiosJwtRequestOption(token!));
    const segData = axios.all([one, two]).then(axios.spread((...responses)=>{
        console.log(responses);
        const segment = responses[0].data;
        let subSegment = null;
        if(responses[0].status === 200){
            subSegment = responses[1].data;
        }else{
            subSegment = null;
        }
        return {segment: segment, subSegment: subSegment};
    }))
    return segData;
}
export const getUserSchoolSegmentInfo = async (token: string | null) => {
    //let response: any[] = new Array();
    const one = await axios.get(`${API_BASE_URL}/userSegment/schoolSegment`,getAxiosJwtRequestOption(token!));
    const two = await axios.get(`${API_BASE_URL}/userSegment/schoolSubSegment`,getAxiosJwtRequestOption(token!));
    const segData = axios.all([one, two]).then(axios.spread((...responses)=>{
        console.log(responses);
        const segment = responses[0].data;
        const subSegment = responses[1].data;
        return {segment: segment, subSegment: subSegment};
    }))
    return segData;
}