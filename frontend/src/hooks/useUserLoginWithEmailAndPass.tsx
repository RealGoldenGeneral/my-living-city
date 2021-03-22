import axios from "axios";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../lib/constants";
import { IUser } from "../lib/types/data/user.type";
import { FetchError } from "../lib/types/types";

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

export const useUserLoginWithEmailAndPass = (loginData: LoginData) => {
  return useQuery<LoginResponse, FetchError>('userLogin', () => getUserWithEmailAndPass(loginData));
}