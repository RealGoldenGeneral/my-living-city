import axios from "axios";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../lib/constants";
import { IdeaInterface } from "../lib/types/data.types";
import { FetchError } from "../lib/types/types";

export const getSingleIdea = async (ideaId: string) => {
  const res = await axios.get<IdeaInterface>(`${API_BASE_URL}/idea/get/${ideaId}`);
  return res.data;
}

const useSingleIdea = (ideaId: string) => {
  return useQuery<IdeaInterface, FetchError>('idea', () => getSingleIdea(ideaId));
}

export default useSingleIdea;