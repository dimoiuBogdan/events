import axios from "axios";
import { BASE_API_URL } from "../../../../../../common/data/constants";
import { EventType } from "../models/events.models";

export const getEventsForCertainDay = async (
  date: Date,
): Promise<EventType[]> => {
  try {
    const res = await axios.get(`${BASE_API_URL}/events/date`, {
      params: { date },
    });

    return res.data;
  } catch (error) {
    console.log("ERROR", error);

    return [];
  }
};
