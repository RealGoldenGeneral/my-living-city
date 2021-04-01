import axios from "axios";
import { API_BASE_URL } from "../constants";
import { IIdea } from "../types/data/idea.type";
import { CreateIdeaInput } from "../types/input/createIdea.input";

export const getAllIdeas = async () => {
  const res = await axios.get<IIdea[]>(`${API_BASE_URL}/idea/getall`);
  return res.data;
}

export const getSingleIdea = async (ideaId: string) => {
  const res = await axios.get<IIdea>(`${API_BASE_URL}/idea/get/${ideaId}`);
  return res.data;
}

export const postCreateIdea = async (ideaData: CreateIdeaInput, token: string | null) => {
  // Parse data and data checking
  const { categoryId, title, description} = ideaData;
  const parsedCatId = Number(categoryId);

  if (!parsedCatId || !title || !description) {
    throw new Error('You must choose a category, define a title, and description of your idea.');
  }

  if (!token) {
    throw new Error('Your session has expired. Please relogin and try again.');
  }

  const parsedPayload = {
    ...ideaData,
    categoryId: parsedCatId,
  }

  const res = await axios.post<IIdea>(`${API_BASE_URL}/idea/create`, parsedPayload, {
    headers: { "secret_token": token }
  });
  return res.data;
}

