import axios from "axios"
import { API_BASE_URL } from "../constants"
import { Rating, RatingAggregateResponse } from "../types/data/rating.type"

export const getAllRatingsUnderIdea = async (ideaId: string): Promise<Rating[]> => {
  if (!ideaId) {
    throw new Error("An ideaId must be specified to fetch all ratings under idea.")
  }

  const res = await axios.get<Rating[]>(`${API_BASE_URL}/rating/getall/${ideaId}`);
  return res.data;
}

export const getAllRatingsUnderIdeaWithAggregations = async (ideaId: string): Promise<RatingAggregateResponse> => {
  if (!ideaId) {
    throw new Error("An ideaId must be specified to fetch all ratings under idea.")
  }

  const res = await axios.get<RatingAggregateResponse>(
    `${API_BASE_URL}/rating/getall/${ideaId}/aggregations`
  );
  return res.data;
}