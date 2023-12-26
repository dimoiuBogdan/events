import dayjs from "dayjs";
import { EventType, EventsLengthsType } from "../models/events.models";

export const mapEvents = (events: EventType[]) => {
  const eventsLengths: EventsLengthsType[] = [];

  for (let index = 0; index < events.length; index++) {
    const fromDate = dayjs(events[index].from_date);

    const numberOfEvents = events.filter((event) =>
      dayjs(event.from_date).isSame(fromDate, "day"),
    ).length;

    if (
      eventsLengths.find((event) => event.from_date === events[index].from_date)
    ) {
      continue;
    }

    eventsLengths.push({
      from_date: events[index].from_date,
      events: numberOfEvents,
    });
  }

  return eventsLengths;
};
