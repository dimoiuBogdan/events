import axios from "axios";
import { BASE_API_URL } from "../../../../data/constants";
import { getFromLocalStorage } from "../../../../data/helpers/helpers";
import {
  AuthModalLoginType,
  AuthModalRegisterType,
  AuthTokensType,
  AuthUserReturnType,
} from "../models/auth.models";

export const refreshAccessToken = async (): Promise<
  AuthTokensType | undefined
> => {
  const refreshToken = getFromLocalStorage("refresh_token");

  if (!refreshToken) {
    return;
  }

  // Need this so that it won't get into an infinite loop refreshAccessToken -> interceptor -> refreshAccessToken -> interceptor ... etc
  const parallelAxiosClient = axios.create();

  const res = await parallelAxiosClient.post(`${BASE_API_URL}/users/refresh`, {
    refreshToken,
  });

  return res.data;
};

export const loginUser = async (
  user: AuthModalLoginType,
): Promise<AuthUserReturnType> => {
  const res = await axios.post(`${BASE_API_URL}/users/login`, user);

  return res.data;
};

export const registerUser = async (
  user: AuthModalRegisterType,
): Promise<AuthUserReturnType> => {
  const res = await axios.post(`${BASE_API_URL}/users/register`, user);

  return res.data;
};

export const logoutUser = async () => {
  await axios.post(`${BASE_API_URL}/users/logout`);
};
