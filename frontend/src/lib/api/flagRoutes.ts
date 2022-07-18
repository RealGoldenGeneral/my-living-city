import axios from "axios";
import { API_BASE_URL } from "../constants";
import { IComment, ICommentAggregateCount } from "../types/data/comment.type";
import { ICreateCommentInput } from "../types/input/createComment.input";
import { getAxiosJwtRequestOption } from "./axiosRequestOptions";


export const createFlagUnderIdea = async (
    ideaId: number,
    token: string,
  ) => {
    if (!ideaId || !token) {
      throw new Error(
        "An ideaId and valid JWT must be specified to create a comment."
      );
    }
    const res = await axios({
        method: "post",
        url: `${API_BASE_URL}/flag/create/${ideaId}`,
        headers: {
          "x-auth-token": token,
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      })
    return res.data;
  };

  export const getAllFlags= async (token: string | null) => {
    const res = await axios.get(`${API_BASE_URL}/flag/getAll`,getAxiosJwtRequestOption(token!));
    return res.data;
  }