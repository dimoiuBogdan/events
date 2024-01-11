import axios from "axios";
import { BASE_API_URL } from "../../../../data/constants";
import { getFromLocalStorage } from "../../../../data/helpers/helpers";
import {
  AuthModalLoginType,
  AuthModalRegisterType,
  AuthTokensType,
  AuthUserReturnType,
} from "../models/auth.models";

/**
 * Refreshes the access token by sending a request to the server and obtaining a new token.
 *
 * @return {Promise<AuthTokensType | undefined>} The new authentication tokens, or undefined if the refresh token is missing.
 */
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

/**
 * Logs in a user.
 *
 * @param {AuthModalLoginType} user - The user object containing login information.
 * @return {Promise<AuthUserReturnType>} - A promise that resolves to the authenticated user data.
 */
export const loginUser = async (
  user: AuthModalLoginType,
): Promise<AuthUserReturnType> => {
  const res = await axios.post(`${BASE_API_URL}/users/login`, user);

  return res.data;
};

/**
 * Registers a user.
 *
 * @param {AuthModalRegisterType} user - The user object to register.
 * @return {Promise<AuthUserReturnType>} A promise that resolves to the registered user data.
 */
export const registerUser = async (
  user: AuthModalRegisterType,
): Promise<AuthUserReturnType> => {
  const res = await axios.post(`${BASE_API_URL}/users/register`, user);

  return res.data;
};

/**
 * Logout the user by making a POST request to the logout endpoint.
 *
 * @return {Promise<any>} The response data from the server.
 */
export const logoutUser = async () => {
  const res = await axios.post(`${BASE_API_URL}/users/logout`);

  return res.data;
};

/**
 * Sends a forgot password request to the server.
 *
 * @param {string} email - The email address of the user.
 * @return {Promise<any>} A promise that resolves to the response data.
 */
export const forgotPassword = async (email: string) => {
  const res = await axios.post(`${BASE_API_URL}/forgot-password`, { email });

  return res.data;
};

/**
 * Verifies the reset token.
 *
 * @param {string} resetToken - The reset token to be verified.
 * @return {Promise<boolean>} A promise that resolves to a boolean indicating whether the reset token is valid.
 */
export const verifyResetToken = async (
  resetToken: string,
): Promise<boolean> => {
  const res = await axios.post(`${BASE_API_URL}/verify-reset-token`, {
    resetToken,
  });

  return res.data;
};

/**
 * Sets a new password for a user using the provided reset token.
 *
 * @param {string} resetToken - The reset token for the user.
 * @param {string} password - The new password to set for the user.
 * @return {Promise<boolean>} A promise that resolves to a boolean indicating whether the password was set successfully.
 */
export const setNewPassword = async (
  resetToken: string,
  password: string,
): Promise<boolean> => {
  const res = await axios.post(`${BASE_API_URL}/set-new-password`, {
    resetToken,
    password,
  });

  return res.data;
};
