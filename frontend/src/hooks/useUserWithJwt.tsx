import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../lib/constants";
import { queryClient } from "../lib/react-query/clientInitializer";
import { IUser } from "../lib/types/data/user.type";
import { FetchError } from "../lib/types/types";

export interface GetUserWithJWTInput {
  jwtAuthToken: string;
}

export interface UseUserWithJwtInput {
  shouldTrigger: boolean;
  jwtAuthToken: string;
}

export const getUserWithJWT = async ({ jwtAuthToken }: GetUserWithJWTInput) => {
  const options = {
    headers: {
      secret_token: jwtAuthToken
    }
  }

  const res = await axios.get<IUser>(`${API_BASE_URL}/user/me`, options)
  return res.data;
}

export const useUserWithJwt = ({ jwtAuthToken, shouldTrigger}: UseUserWithJwtInput) => {
  return useQuery<IUser, AxiosError>(
    'user',
    () => getUserWithJWT({ jwtAuthToken }),
    {
      initialData: () => {
        const cachedData = queryClient.getQueryData('user') as (IUser | undefined)
        console.log("Cached Data ", cachedData);

        return cachedData
      },
      enabled: shouldTrigger
    }
  )
}

// const useSingleIdea = (ideaId: string) => {
//   return useQuery<IdeaInterface, FetchError>('idea', () => getSingleIdea(ideaId));
// }

