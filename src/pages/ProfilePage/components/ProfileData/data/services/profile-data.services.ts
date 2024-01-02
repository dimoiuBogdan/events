import axios from "axios";
import { BASE_API_URL } from "../../../../../../common/data/constants";

export const updateProfileField = async (
  id: string,
  value: string,
  key: string,
): Promise<boolean> => {
  const res = await axios.patch(`${BASE_API_URL}/users/${id}`, { key, value });

  return res.data;
};
