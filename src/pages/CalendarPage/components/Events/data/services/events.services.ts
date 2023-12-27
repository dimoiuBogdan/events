import axios from "axios";
import { BASE_API_URL } from "../../../../../../common/data/constants";
import { EventType, NewEventType } from "../models/events.models";

export const getEventsForCertainDay = async (
  date: Date,
): Promise<EventType[]> => {
  const res = await axios.get(`${BASE_API_URL}/events/date`, {
    params: { date },
  });

  return res.data;
};

export const getEvents = async (): Promise<EventType[]> => {
  const res = await axios.get(`${BASE_API_URL}/events`);

  return res.data;
};

export const getEventById = async (
  id: string,
): Promise<EventType | undefined> => {
  const res = await axios.get(`${BASE_API_URL}/events/${id}`);

  return res.data;
};

export const addEvent = async (event: NewEventType): Promise<EventType> => {
  const res = await axios.post(`${BASE_API_URL}/events`, event);

  return res.data;
};

export const removeEvent = async (id: string): Promise<boolean> => {
  const res = await axios.delete(`${BASE_API_URL}/events/${id}`);

  return res.data;
};
