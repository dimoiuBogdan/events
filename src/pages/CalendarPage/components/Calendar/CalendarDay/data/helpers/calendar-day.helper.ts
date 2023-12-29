import dayjs from "dayjs";
import {
  CalendarDateType,
  CalendarDayType,
} from "../../../../../data/models/calendar.page.models";
import { EventsLengthsType } from "../../../../Events/data/models/events.models";

export const getIsToday = (day: CalendarDayType) => {
  if (!day) return false;

  const mappedDayToSelectedDate = mapDayToSelectedDate(day);

  return (
    dayjs().date() === mappedDayToSelectedDate.day &&
    dayjs().month() === mappedDayToSelectedDate.month &&
    dayjs().year() === mappedDayToSelectedDate.year
  );
};

export const getIsSelected = (
  day: CalendarDayType,
  selectedDate: CalendarDateType,
) => {
  if (!day || !selectedDate) return false;

  const mappedDayToSelectedDate = mapDayToSelectedDate(day);

  return (
    selectedDate.day === mappedDayToSelectedDate.day &&
    selectedDate.month === mappedDayToSelectedDate.month &&
    selectedDate.year === mappedDayToSelectedDate.year
  );
};

export const getCurrentDayEventsLengths = (
  eventsLengths: EventsLengthsType[],
  day: CalendarDayType,
) => {
  if (!eventsLengths || !day) return 0;

  const mappedDayToSelectedDate = mapDayToSelectedDate(day);

  return eventsLengths.find(
    (event) =>
      dayjs(event.from_date).date() === mappedDayToSelectedDate.day &&
      dayjs(event.from_date).month() === mappedDayToSelectedDate.month &&
      dayjs(event.from_date).year() === mappedDayToSelectedDate.year,
  )?.events;
};

export const mapDayToSelectedDate = (day: CalendarDayType) => {
  if (!day) return {};

  return {
    day: day.date.date(),
    month: day.date.month(),
    year: day.date.year(),
  };
};
