import axios from "axios";
import { BASE_API_URL } from "../../../../data/constants";
import { UserType } from "../models/user.models";

export const getUserById = async (id: number): Promise<UserType> => {
  const res = await axios.get(`${BASE_API_URL}/users/${id}`);

  return res.data;
};
