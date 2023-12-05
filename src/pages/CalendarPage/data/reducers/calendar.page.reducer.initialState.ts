import dayjs from "dayjs";
import { CalendarDateType } from "../calendar.page.models";

export interface CalendarPageInitialStateInterface {
  selectedDate: CalendarDateType;
}

export const CalendarPageReducerInitialState: Readonly<CalendarPageInitialStateInterface> =
  {
    selectedDate: {
      day: dayjs().date(),
      month: dayjs().month(),
      year: dayjs().year(),
    },
  };
