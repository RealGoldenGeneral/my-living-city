import axios from "axios"
import { API_BASE_URL } from "../constants"
import { Comment } from "../types/data/comment.type"

export const getAllComments = async (): Promise<Comment[]> => {
  const res = await axios.get<Comment[]>(`${API_BASE_URL}/comments/getall`);
  return res.data;
}

export const getCommentsUnderIdea = async (ideaId: string): Promise<Comment[]> => {
  if (!ideaId) {
    throw new Error("An ideaId must be specified to fetch all comments under idea.")
  }

  const res = await axios.get<Comment[]>(`${API_BASE_URL}/comment/getall/${ideaId}`);
  return res.data;
}