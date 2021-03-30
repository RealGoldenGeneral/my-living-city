import axios from "axios";
import { API_BASE_URL } from "../constants";
import { IUser } from "../types/data/user.type";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: IUser;
  token: string;
}

export const getUserWithEmailAndPass = async (loginData: LoginData) => {
  const res = await axios.post<LoginResponse>(`${API_BASE_URL}/user/login`, loginData)
  return res.data;
}

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