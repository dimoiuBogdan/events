import { EventType, EventsLengthsType } from "../models/events.models";

export const mapEvents = (eventList: EventType[]): EventsLengthsType[] => {
  return eventList.map((event) => ({
    id: event.id,
    name: event.name,
    from_date: event.from_date,
    to_date: event.to_date,
  }));
};
