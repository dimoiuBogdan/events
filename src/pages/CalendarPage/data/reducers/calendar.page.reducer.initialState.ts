import dayjs from "dayjs";

export interface CalendarPageInitialStateInterface {
  selectedMonth: number;
}

export const CalendarPageReducerInitialState: Readonly<CalendarPageInitialStateInterface> =
  {
    selectedMonth: dayjs().month(),
  };
