import axios from "axios";
import { format } from "prettier";
import { API_BASE_URL } from "../constants";
import { CreateAdvertisementInput } from "../types/input/advertisement.input";
import { getAxiosJwtRequestOption } from "./axiosRequestOptions";

export const postCreateAdvertisement = async (advertisementData:CreateAdvertisementInput, token: string | null) =>{
    const {adType,adTitle,adPosition, duration, adImage, published} = advertisementData;

    if(!adType||!(adType==='BASIC'||adType==='EXTRA')){
        throw new Error("You must choose a advertisement type, or someting is wrong when accepting adType data.")
    }

    if(!adTitle||adTitle.length<2||adTitle.length>40){
        throw new Error("adTitle must be provided or something is wrong when accepting adTitle data.")
    }

    if(!adPosition||adPosition.length<1||adPosition.length>85){
        throw new Error("You must provide a target position for advertisemen or your position length is invalid (longer or equal to 1, shorter than 85)");
    }

    if(!duration||duration<=0){
        throw new Error("You must provide a duration for your advertisement or your duration is invalid (must be bigger than 0)");
    }

    if(!adImage){
        throw new Error("You must provided a advertisement image for you advertisement.");
    }

    if(published==null || published==undefined){
        throw new Error("You must let us know if you want to publish you advertisement.");
    }

    const advertisementForm = new FormData;
    advertisementForm.append('adType',adType);
    advertisementForm.append('adTitle',adTitle);
    advertisementForm.append('adPosition',adPosition);
    advertisementForm.append('duration', duration.toString());
    advertisementForm.append('adImage', adImage);
    advertisementForm.append('published', published ? 'true' : 'false');

    const res = await axios({
        method: "post",
        url: `${API_BASE_URL}/advertisement/create`,
        data: advertisementForm,
        headers: { "Content-Type": "multipart/form-data", "x-auth-token": token, "Access-Control-Allow-Origin": "*" },
        withCredentials: true
    })

    if(!(res.status==201 || res.status==200)){
        throw new Error(res.data);
    }

    return res.data;
}