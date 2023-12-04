import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { CalendarPageReducerActions } from "../reducers/calendar.page.reducer.actions";

type ReturnType = {
  selectedMonth: number;
  incrementMonth: (number: 1 | -1) => void;
  handleChangeMonth: (number: number) => void;
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

  return {
    selectedMonth,
    incrementMonth,
    handleChangeMonth,
  };
};

export default useCalendar;
