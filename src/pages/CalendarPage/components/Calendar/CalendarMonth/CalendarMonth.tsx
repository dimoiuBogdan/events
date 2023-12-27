import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useCalendar from "../../../data/hooks/useCalendar";
import CalendarMonthName from "./CalendarMonthName";

const CalendarMonth = () => {
  const { incrementMonth, handleChangeSelectedDate, isCurrentMonthSelected } =
    useCalendar();

  const selectTodayIfCurrentMonth = useCallback(() => {
    if (!isCurrentMonthSelected) return;

    handleChangeSelectedDate({
      day: dayjs().date(),
    });
  }, [isCurrentMonthSelected, handleChangeSelectedDate]);

  useEffect(() => {
    selectTodayIfCurrentMonth();
  }, [selectTodayIfCurrentMonth]);

  return (
    <div className="my-3 flex items-center justify-evenly gap-x-2 text-lg font-medium">
      <FaChevronLeft
        onClick={() => incrementMonth(-1)}
        className="cursor-pointer text-indigo-500 drop-shadow-md hover:text-indigo-600"
      />
      <CalendarMonthName />
      <FaChevronRight
        onClick={() => incrementMonth(1)}
        className="cursor-pointer text-indigo-500 drop-shadow-md hover:text-indigo-600"
      />
    </div>
  );
};

export default CalendarMonth;
