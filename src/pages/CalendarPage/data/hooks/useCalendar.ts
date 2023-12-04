import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { CalendarDayType } from "../calendar.page.models";
import { CalendarPageReducerActions } from "../reducers/calendar.page.reducer.actions";

type ReturnType = {
  selectedMonth: number;
  incrementMonth: (number: 1 | -1) => void;
  handleChangeMonth: (number: number) => void;
  getDaysOfMonth: (month: number) => CalendarDayType[][];
};
const useCalendar = (): ReturnType => {
  const dispatch = useAppDispatch();

  const selectedMonth = useAppSelector(
    (state) => state.calendarPageReducer.selectedMonth,
  );

  const incrementMonth = (number: 1 | -1) => {
    dispatch(CalendarPageReducerActions.setMonth(selectedMonth + number));
  };

  const handleChangeMonth = (number: number) => {
    dispatch(CalendarPageReducerActions.setMonth(number));
  };

  const getDaysOfMonth = (
    month: number = dayjs().month(),
  ): CalendarDayType[][] => {
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
          isCurrentMonth: !dateExceedingMonth,
        });
      }

      days.push(week);
    }

    return days;
  };

  return {
    selectedMonth,
    incrementMonth,
    handleChangeMonth,
    getDaysOfMonth,
  };
};

export default useCalendar;
