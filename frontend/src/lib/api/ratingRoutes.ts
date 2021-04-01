import axios from "axios"
import { API_BASE_URL } from "../constants"
import { Rating } from "../types/data/rating.type"

export const getAllRatingsUnderIdea = async (ideaId: string): Promise<Rating[]> => {
  if (!ideaId) {
    throw new Error("An ideaId must be specified to fetch all ratings under idea.")
  }

  const res = await axios.get<Rating[]>(`${API_BASE_URL}/rating/getall/${ideaId}`);
  return res.data;
}