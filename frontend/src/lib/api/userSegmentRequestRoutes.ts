import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../constants";
import { IUserSegmentRequest } from "../types/input/register.input";
export const postUserSegmentRequest = async (requestData: IUserSegmentRequest, token:string) => {
    const res = await axios({
        method: "post",
        url: `${API_BASE_URL}/userSegment/create`,
        data: requestData,
        headers: {"Access-Control-Allow-Origin": "*", "x-auth-token": token},
        withCredentials: true
    })
    console.log(res.data);
    return res.data;
}