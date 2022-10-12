import axios from "axios";
import { API_BASE_URL } from "../constants";
import { IComment, ICommentAggregateCount } from "../types/data/comment.type";
import { ICreateCommentInput } from "../types/input/createComment.input";
import { getAxiosJwtRequestOption } from "./axiosRequestOptions";

//For IdeaFlags
export const createFlagUnderIdea = async (
    ideaId: number,
    flagReason: string,
    token: string,
  ) => {
    if (!ideaId || !token) {
      throw new Error(
        "An ideaId and valid JWT must be specified to flag."
      );
    }
    const res = await axios({
        method: "post",
        url: `${API_BASE_URL}/flag/create/${ideaId}`,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
          "Access-Control-Allow-Origin": "*",
        },
        data: {flagReason: flagReason},
        withCredentials: true,
      })
    return res.data;
  };
//For IdeaFlags
  export const updateFalseFlagIdea = async (
    ideaId: number,
    token: string,
    isFalse: boolean,
  ) => {
    if(!ideaId || !token){
      throw new Error(
        "An ideaId and valid JWT must be specified"
      );
    }
    const res = await axios({
      method: "put",
      url: `${API_BASE_URL}/flag/falseFlagMany/${ideaId}`,
      headers: {
        "x-auth-token": token,
        "Access-Control-Allow-Origin": "*",
      },
      data: {isFalse: isFalse},
      withCredentials: true,
    })
    return res.data;
  }

//For IdeaFlags
  export const getAllFlags= async (token: string | null) => {
    const res = await axios.get(`${API_BASE_URL}/flag/getAll`,getAxiosJwtRequestOption(token!));
    return res.data;
  }


//For commentFlags
export const createCommentFlagUnderIdea = async (
  commentId: number,
  token: string,
) => {
  if (!commentId || !token) {
    throw new Error(
      "A commentId and valid JWT must be specified to flag."
    );
  }
  const res = await axios({
      method: "post",
      url: `${API_BASE_URL}/commentFlag/create/${commentId}`,
      headers: {
        "x-auth-token": token,
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    })
  return res.data;
};

//For commentFlags
export const updateFalseFlagComment = async (
  commentId: number,
  token: string,
  isFalse: boolean,
) => {
  if(!commentId || !token){
    throw new Error(
      "A commentId and valid JWT must be specified"
    );
  }
  const res = await axios({
    method: "put",
    url: `${API_BASE_URL}/commentFlag/falseFlagMany/${commentId}`,
    headers: {
      "x-auth-token": token,
      "Access-Control-Allow-Origin": "*",
    },
    data: {isFalse: isFalse},
    withCredentials: true,
  })
  return res.data;
}

  //For commentFlags
  export const getAllCommentFlags= async (token: string | null) => {
    const res = await axios.get(`${API_BASE_URL}/commentFlag/getAll`,getAxiosJwtRequestOption(token!));
    return res.data;
  }
