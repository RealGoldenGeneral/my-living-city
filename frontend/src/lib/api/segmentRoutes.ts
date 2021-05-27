import axios from "axios"
import { API_BASE_URL } from "../constants"
import { ISegment, ISubSegment } from "../types/data/segment.type"
import { getAxiosJwtRequestOption } from "./axiosRequestOptions";
export const getAllSegments = async () => {
  const res = await axios.get<ISegment[]>(`${API_BASE_URL}/segment/getall`);
  return res.data;
}
export const getAllSubSegmentsWithId = async (segId: any, token: string) => {
  const res = await axios.get<ISubSegment[]>(`${API_BASE_URL}/subSegment/getBySegmentId/${segId}`);
  return res.data;
}
// export const getAllSubSegmentsWithId = async (segId: any, token: any) => {
//   const res = await axios<ISubSegment[]>({
//     method: "get",
//     url: `${API_BASE_URL}/subSegment/getBySegmentId/${segId}`,
//     headers: { "x-auth-token": token, "Access-Control-Allow-Origin": "*",},
//     withCredentials: true
// })
// //if not success, throw error which will stop form reset
// if(!(res.status===201 || res.status===200)){
//     throw new Error(res.data);    
// }
// return res.data;
// }
// export const getAllSubSegmentsWithId = async (
//   subSegmentId: string,
//   token: string | null | undefined,
// ): Promise<ISubSegment[]> => {
//   if (!subSegmentId) {
//     throw new Error("An ideaId must be specified to fetch all comments under idea.")
//   }

//   const res = await axios.get<ISubSegment[]>(
//     `${API_BASE_URL}/subSegment/getBySubSegmentId/${subSegmentId}`,
//     getAxiosJwtRequestOption(token!)
//   );
//   return res.data;
// }
// export const getAllSubSegmentsWithId = async (subSegmentId: any, token: string) => {
//   const res = await axios.get<ISubSegment>(`${API_BASE_URL}/subSegment/getBySubSegmentId/${subSegmentId}`,getAxiosJwtRequestOption(token));
//   return res.data;
// }
export const updateSegment = async (segData: any, token:any) =>{
  const{segId}=segData;
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