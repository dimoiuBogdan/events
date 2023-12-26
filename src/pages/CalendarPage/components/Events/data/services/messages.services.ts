import axios from "axios";
import { BASE_API_URL } from "../../../../../../common/data/constants";

export const sendMessage = async (
  message: string,
  to: string,
  from: string,
) => {
  const res = await axios.post(`${BASE_API_URL}/send-message`, {
    message,
    to,
    from,
  });

  return res.data;
};
