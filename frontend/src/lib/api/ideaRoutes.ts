import axios from "axios";
import { API_BASE_URL } from "../constants";
import { IIdea } from "../types/data/idea.type";

export const getAllIdeas = async () => {
  const res = await axios.get<IIdea[]>(`${API_BASE_URL}/idea/getall`);
  return res.data;
}

export const getSingleIdea = async (ideaId: string) => {
  const res = await axios.get<IIdea>(`${API_BASE_URL}/idea/get/${ideaId}`);
  return res.data;
}

