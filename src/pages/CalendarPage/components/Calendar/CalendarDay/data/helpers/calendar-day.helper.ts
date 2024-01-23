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
  eventsLengths: EventsLengthsType[] | undefined,
  day: CalendarDayType,
) => {
  if (!eventsLengths || !day) return 0;

  const {
    day: mappedDay,
    month: mappedMonth,
    year: mappedYear,
  } = mapDayToSelectedDate(day);

  return eventsLengths.filter((event) => {
    if (event.to_date) {
      return (
        mappedDay &&
        dayjs(event.from_date).date() <= mappedDay &&
        dayjs(event.to_date).date() >= mappedDay &&
        dayjs(event.from_date).month() <= mappedMonth &&
        dayjs(event.to_date).month() >= mappedMonth &&
        dayjs(event.from_date).year() <= mappedYear &&
        dayjs(event.to_date).year() >= mappedYear
      );
    } else {
      return (
        mappedDay &&
        dayjs(event.from_date).date() === mappedDay &&
        dayjs(event.from_date).month() === mappedMonth &&
        dayjs(event.from_date).year() === mappedYear
      );
    }
  }).length;
};

export const mapDayToSelectedDate = (day: CalendarDayType) => {
  if (!day) return {};

  return {
    day: day.date.date(),
    month: day.date.month(),
    year: day.date.year(),
  };
};
