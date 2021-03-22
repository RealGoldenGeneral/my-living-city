import axios from "axios";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../lib/constants";
import { queryCache, queryClient } from "../lib/react-query/clientInitializer";
import { IIdea } from "../lib/types/data/idea.type";
import { FetchError } from "../lib/types/types";
import { getAllIdeas } from "./useIdeas";

export const getSingleIdea = async (ideaId: string) => {
  const res = await axios.get<IIdea>(`${API_BASE_URL}/idea/get/${ideaId}`);
  return res.data;
}

const useSingleIdea = (ideaId: string) => {
  return useQuery<IIdea, FetchError>(
    ['idea', ideaId], 
    () => getSingleIdea(ideaId),
  );
}

export default useSingleIdea;