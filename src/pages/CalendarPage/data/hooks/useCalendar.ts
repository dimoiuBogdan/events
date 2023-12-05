import dayjs from "dayjs";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { CalendarDateType, CalendarDayType } from "../calendar.page.models";
import { CalendarPageReducerActions } from "../reducers/calendar.page.reducer.actions";

type ReturnType = {
  selectedDate: CalendarDateType;
  incrementMonth: (number: 1 | -1) => void;
  handleChangeMonth: (number: number) => void;
  getDaysOfMonth: (month: number) => CalendarDayType[][];
};
const useCalendar = (): ReturnType => {
  const dispatch = useAppDispatch();

  const selectedDate = useAppSelector(
    (state) => state.calendarPageReducer.selectedDate,
  );

  const incrementMonth = (number: 1 | -1) => {
    const isNextYear = selectedDate.month + number === 12;
    const isPreviousYear = selectedDate.month + number === -1;

    dispatch(
      CalendarPageReducerActions.setSelectedDate({
        month: selectedDate.month + number,
        year: isNextYear
          ? selectedDate.year + 1
          : isPreviousYear
            ? selectedDate.year - 1
            : selectedDate.year,
      }),
    );
  };

  const handleChangeMonth = (number: number) => {
    dispatch(
      CalendarPageReducerActions.setSelectedDate({
        month: number,
      }),
    );
  };

  const getDaysOfMonth = useCallback(
    (month: number = dayjs().month()): CalendarDayType[][] => {
      const year = dayjs().year();
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
    [],
  );

  return {
    selectedDate,
    incrementMonth,
    handleChangeMonth,
    getDaysOfMonth,
  };
};

export default useCalendar;
