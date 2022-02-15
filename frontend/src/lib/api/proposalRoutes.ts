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

export const getDirectProposal = async () => {
  const res = await axios.get(`${API_BASE_URL}/proposal/`);
  return res.data;
};

export const getAllProposals = async () => {
  const res = await axios.get(`${API_BASE_URL}/proposal/getall`);
  return res.data;
};

export const postAllProposalsWithBreakdown = async (take?: number) => {
  let reqBody = {};
  if (!!take) {
    reqBody = {
      take,
    };
  }
  const res = await axios.post(
    `${API_BASE_URL}/proposal/getall/aggregations`,
    reqBody
  );
  return res.data;
};

export const getSingleProposal = async (ideaId: string) => {
  const res = await axios.get(`${API_BASE_URL}/proposal/get/${ideaId}`);
  return res.data;
};
