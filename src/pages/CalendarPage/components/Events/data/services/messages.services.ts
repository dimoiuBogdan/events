import axios from "axios";
import { BASE_API_URL } from "../../../../../../common/data/constants";

/**
 * Sends a message to a specified recipient from a specified sender.
 *
 * @param {string} message - The message to be sent.
 * @param {string} to - The recipient of the message.
 * @param {string} from - The sender of the message.
 * @return {Promise<any>} - The response data from the API call.
 */
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
