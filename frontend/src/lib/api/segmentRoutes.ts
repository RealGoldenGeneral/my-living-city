import axios from "axios"
import { API_BASE_URL } from "../constants"
import { ISegment, ISubSegment } from "../types/data/segment.type"
import { getAxiosJwtRequestOption } from "./axiosRequestOptions";
export const getAllSegments = async () => {
  const res = await axios.get<ISegment[]>(`${API_BASE_URL}/segment/getall`);
  return res.data;
}
// export const updateSegment = async (segData: any, token:any) => {
//   const{segId}=segData;
//   const res = await axios.post(`${API_BASE_URL}/segment/update/${segId}`, segData, getAxiosJwtRequestOption(token));
//   return res.data;
// }

export const updateSegment = async (segData: any, token:any) =>{
  const{segId, name, superSegName}=segData;
  const parsedPayload = {...segData};
  console.log(segData);
  console.log(token);
  const res = await axios({
      method: "post",
      url: `${API_BASE_URL}/segment/update/${segId}`,
      data: parsedPayload,
      headers: { "x-auth-token": token, "Access-Control-Allow-Origin": "*",},
      withCredentials: true
  })
  //if not success, throw error which will stop form reset
  if(!(res.status===201 || res.status===200)){
      throw new Error(res.data);    
  }
  return res.data;
}