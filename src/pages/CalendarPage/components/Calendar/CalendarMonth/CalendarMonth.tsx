import dayjs from "dayjs";
import { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useCalendar from "../../../data/hooks/useCalendar";
import CalendarMonthName from "./CalendarMonthName";

const CalendarMonth = () => {
  const {
    incrementMonth,
    handleChangeSelectedDate,
    selectedDate,
    isCurrentMonthSelected,
  } = useCalendar();

  useEffect(() => {
    if (isCurrentMonthSelected) {
      handleChangeSelectedDate({
        day: dayjs().date(),
      });
    }
  }, [handleChangeSelectedDate, isCurrentMonthSelected, selectedDate.month]);

  return (
    <div className="my-3 flex items-center justify-evenly text-lg font-medium">
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
