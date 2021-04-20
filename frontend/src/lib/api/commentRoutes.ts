import axios from "axios"
import { API_BASE_URL } from "../constants"
import { Comment, CommentAggregateCount } from "../types/data/comment.type"
import { CreateCommentInput } from "../types/input/createComment.input";
import { getAxiosJwtRequestOption } from "./axiosRequestOptions";

export const getAllComments = async (): Promise<Comment[]> => {
  const res = await axios.get<Comment[]>(`${API_BASE_URL}/comments/getall`);
  return res.data;
}

export const getCommentsUnderIdea = async (
  ideaId: string,
  token: string | null | undefined,
): Promise<Comment[]> => {
  if (!ideaId) {
    throw new Error("An ideaId must be specified to fetch all comments under idea.")
  }

  const res = await axios.get<Comment[]>(
    `${API_BASE_URL}/comment/getall/${ideaId}`,
    getAxiosJwtRequestOption(token!)
  );
  return res.data;
}

export const getCommentAggregateUnderIdea = async (ideaId: string) => {
  if (!ideaId) {
    throw new Error("An ideaId must be specified to fetch all comments under idea.")
  }

  const res = await axios.get<CommentAggregateCount>(
    `${API_BASE_URL}/comment/aggregate/${ideaId}`
  );
  return res.data;
}

export const createCommentUnderIdea = async (
  ideaId: number, 
  token: string, 
  commentPayload: CreateCommentInput
): Promise<Comment> => {
  if (!ideaId || !token) {
    throw new Error("An ideaId and valid JWT must be specified to create a comment.")
  }

  const res = await axios.post<Comment>(
    `${API_BASE_URL}/comment/create/2`,
    commentPayload,
    getAxiosJwtRequestOption(token),
  )

  return res.data;
}