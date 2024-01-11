import axios from "axios";
import { BASE_API_URL } from "../../../../data/constants";
import { UserType } from "../models/user.models";

/**
 * Retrieves a user by their ID.
 *
 * @param {number} id - The ID of the user to retrieve.
 * @return {Promise<UserType>} A promise that resolves with the user data.
 */
export const getUserById = async (id: number): Promise<UserType> => {
  const res = await axios.get(`${BASE_API_URL}/users/${id}`);

  return res.data;
};

/**
 * Retrieves the user profile image for the given user ID.
 *
 * @param {number} userId - The ID of the user.
 * @return {Promise<Blob | undefined>} A promise that resolves to the user profile image as a Blob, or undefined if the image could not be retrieved.
 */
export const getUserProfileImage = async (
  userId: number,
): Promise<Blob | undefined> => {
  const res = await axios.get(`${BASE_API_URL}/get-profile-image/${userId}`, {
    responseType: "blob",
  });

  if (res.status !== 200) return undefined;

  return res.data;
};
