import { useQuery } from 'react-query';
import { FetchError } from '../lib/types/types';
import { getUserWithEmailAndPass, getUserWithJWT, getUserWithJWTVerbose, LoginData, LoginResponse, UseUserWithJwtInput } from '../lib/api/userRoutes';
import { AxiosError } from 'axios';
import { queryClient } from '../lib/react-query/clientInitializer';
import { IUser } from '../lib/types/data/user.type';

export const useUserLoginWithEmailAndPass = (loginData: LoginData) => {
  return useQuery<LoginResponse, FetchError>('userLogin', () => getUserWithEmailAndPass(loginData));
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

export const useUserWithJwtVerbose = ({ jwtAuthToken, shouldTrigger}: UseUserWithJwtInput) => {
  return useQuery<IUser, AxiosError>(
    'user',
    () => getUserWithJWTVerbose({ jwtAuthToken }),
    {
      enabled: shouldTrigger
    }
  )
}