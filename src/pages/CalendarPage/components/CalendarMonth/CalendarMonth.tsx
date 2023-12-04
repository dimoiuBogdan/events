import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useCalendar from "../../data/hooks/useCalendar";
import CalendarMonthName from "./CalendarMonthName";

const CalendarMonth = () => {
  const { incrementMonth } = useCalendar();

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
