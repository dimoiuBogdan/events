import axios from "axios";
import { BASE_API_URL } from "../../../../data/constants";
import { UserType } from "../models/user.models";

export const getUserById = async (id: number): Promise<UserType> => {
  const res = await axios.get(`${BASE_API_URL}/users/${id}`);

  return res.data;
};

export const getUserProfileImage = async (userId: number): Promise<Blob> => {
  const res = await axios.get(`${BASE_API_URL}/get-profile-image/${userId}`, {
    responseType: "blob",
  });

  if (res.status !== 200) {
    throw new Error("File not found");
  }

  return res.data;
};
