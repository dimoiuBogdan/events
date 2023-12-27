import dayjs from "dayjs";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { EventType } from "../../components/Events/data/models/events.models";
import { getEventsForCertainDay } from "../../components/Events/data/services/events.services";
import {
  CalendarDateType,
  CalendarDayType,
} from "../models/calendar.page.models";
import { CalendarPageReducerActions } from "../reducers/calendar.page.reducer.actions";

type ReturnType = {
  selectedDate: CalendarDateType;
  isCurrentMonthSelected: boolean;
  incrementMonth: (number: 1 | -1) => void;
  getDaysOfMonth: (month: number, year: number) => CalendarDayType[][];
  handleChangeSelectedDate: (date: Partial<CalendarDateType>) => void;
  formatDate: (date: Date | string, format: string) => string;
  getEventsForSelectedDate: (date: CalendarDateType) => Promise<EventType[]>;
};
const useCalendar = (): ReturnType => {
  const dispatch = useAppDispatch();

  const selectedDate = useAppSelector(
    (state) => state.calendarPageReducer.selectedDate,
  );

  const isCurrentMonthSelected =
    selectedDate.month === dayjs().month() &&
    selectedDate.year === dayjs().year();

  const incrementMonth = (number: 1 | -1) => {
    const month = dayjs()
      .month(selectedDate.month + number)
      .month();

    const year = dayjs()
      .year(
        number === 1 && selectedDate.month === 11
          ? selectedDate.year + 1
          : number === -1 && selectedDate.month === 0
            ? selectedDate.year - 1
            : selectedDate.year,
      )
      .year();

    dispatch(
      CalendarPageReducerActions.setSelectedDate({
        month,
        year,
      }),
    );
  };

  const handleChangeSelectedDate = useCallback(
    (date: Partial<CalendarDateType>) => {
      dispatch(
        CalendarPageReducerActions.setSelectedDate({
          month: date.month,
          year: date.year,
          day: date.day,
        }),
      );
    },
    [dispatch],
  );

  const getDaysOfMonth = useCallback(
    (
      month: number = dayjs().month(),
      year: number = dayjs().year(),
    ): CalendarDayType[][] => {
      const firstDayOfTheMonth = dayjs(new Date(year, month)).day();
      const daysInMonth = dayjs(new Date(year, month)).daysInMonth();

      const firstDayIsMonday = firstDayOfTheMonth === 1;
      const lastMonday = -(firstDayOfTheMonth - 1);
      const NUMBER_OF_WEEKS = 5;
      const NUMBER_OF_DAYS_IN_WEEK = 7;

      let startingDate = firstDayIsMonday ? 0 : lastMonday;
      const days: CalendarDayType[][] = [];

      for (let i = 0; i < NUMBER_OF_WEEKS; i++) {
        const week: CalendarDayType[] = [];

        for (let j = 0; j < NUMBER_OF_DAYS_IN_WEEK; j++) {
          startingDate++;

          const dateExceedingMonth =
            startingDate > daysInMonth || startingDate < 1;

          week.push({
            date: dayjs(new Date(year, month, startingDate)),
            isCurrentMonth:
              !dateExceedingMonth && selectedDate.year === dayjs().year(),
          });
        }

        days.push(week);
      }

      return days;
    },
    [selectedDate.year],
  );

  const getEventsForSelectedDate = async (date: CalendarDateType) => {
    if (!date.day) return [];

    const mappedDate = new Date(date.year, date.month, date.day);

    const events = await getEventsForCertainDay(mappedDate);

    return events;
  };

  const formatDate = (date: Date | string, format: string) =>
    dayjs(date).format(format);

  return {
    getDaysOfMonth,
    handleChangeSelectedDate,
    incrementMonth,
    isCurrentMonthSelected,
    selectedDate,
    formatDate,
    getEventsForSelectedDate,
  };
};

export default useCalendar;
