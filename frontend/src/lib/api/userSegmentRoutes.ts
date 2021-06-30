import axios from "axios";
import { API_BASE_URL } from "../constants";
import { IRegisterInput } from "../types/input/register.input";
import { getAxiosJwtRequestOption } from "./axiosRequestOptions";

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

