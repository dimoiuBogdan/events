import { Dayjs } from "dayjs";

export type CalendarDayType = {
  date: Dayjs;
  isCurrentMonth: boolean;
};

export type CalendarDateType = {
  day: number | undefined;
  month: number;
  year: number;
};
