import axios from "axios";
import { BASE_API_URL } from "../../../../../../common/data/constants";
import {
  EventEditType,
  EventType,
  NewEventType,
} from "../models/events.models";

/**
 * Retrieves events for a certain day.
 *
 * @param {Date} date - The specific date for which to retrieve events.
 * @return {Promise<EventType[]>} - A promise that resolves to an array of event types.
 */
export const getEventsForCertainDay = async (
  date: Date,
): Promise<EventType[]> => {
  const res = await axios.get(`${BASE_API_URL}/events/date`, {
    params: { date },
  });

  return res.data;
};

/**
 * Retrieves a list of events from the server.
 *
 * @returns {Promise<EventType[]>} A promise that resolves to an array of EventType objects representing the events.
 */
export const getEvents = async (): Promise<EventType[]> => {
  const res = await axios.get(`${BASE_API_URL}/events`);

  return res.data;
};

/**
 * Retrieves an event by its ID.
 *
 * @param {string} id - The ID of the event to retrieve.
 * @return {Promise<EventType | undefined>} The retrieved event data, or undefined if the event does not exist.
 */
export const getEventById = async (
  id: string,
): Promise<EventType | undefined> => {
  const res = await axios.get(`${BASE_API_URL}/events/${id}`);

  return res.data;
};

/**
 * Adds a new event to the API.
 *
 * @param {NewEventType} event - The new event to be added.
 * @return {Promise<EventType>} The added event.
 */
export const addEvent = async (event: NewEventType): Promise<EventType> => {
  const res = await axios.post(`${BASE_API_URL}/events`, event);

  return res.data;
};

/**
 * Remove an event from the API.
 *
 * @param {string} id - The ID of the event to be removed.
 * @return {Promise<boolean>} A promise that resolves to true if the event is successfully removed, or false otherwise.
 */
export const removeEvent = async (id: string): Promise<boolean> => {
  const res = await axios.delete(`${BASE_API_URL}/events/${id}`);

  return res.data;
};

/**
 * Updates an event in the database.
 *
 * @param {string} id - The ID of the event to be updated.
 * @param {EventEditType} event - The updated event data.
 * @return {Promise<boolean>} A promise that resolves to true if the event was updated successfully, false otherwise.
 */
export const updateEvent = async (
  id: string,
  event: EventEditType,
): Promise<boolean> => {
  const res = await axios.put(`${BASE_API_URL}/events/${id}`, event);

  return res.data;
};
