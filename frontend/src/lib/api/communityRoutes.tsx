import axios from "axios";
import { API_BASE_URL } from "../constants";
import {
  IGetAllIdeasWithSort,
  getAllIdeasWithSortDefault,
  IIdeaOrderByAggregate,
} from "../types/args/getAllIdeas.args";
import {
  IIdeaWithAggregations,
  IIdeaWithRelationship,
} from "../types/data/idea.type";
import { ICreateIdeaInput } from "../types/input/createIdea.input";
import { getAxiosJwtRequestOption } from "./axiosRequestOptions";

export const postCreateCollabotator = async (
  proposalId: number,
  collaboratorData: any,
  banned: boolean,
  token: string | null
) => {
  const formBody = new FormData();
  // Parse data and data checking

  const { experience, role, time, contactInfo } = collaboratorData;

  if (!experience || !role || !time || !contactInfo) {
    throw new Error("Missing data");
  }

  if (!token) {
    throw new Error("Your session has expired. Please relogin and try again.");
  }

  formBody.append("experience", experience);
  formBody.append("role", role);
  formBody.append("time", time);
  formBody.append("contactInfo", contactInfo);

  const res = await axios({
    method: "post",
    url: `${API_BASE_URL}/create/collaborator/${proposalId}`,
    data: formBody,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": token,
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  });

  if (!(res.status == 201 || res.status == 200)) {
    throw new Error(res.data);
  }
  //return response data
  return res.data;
};
