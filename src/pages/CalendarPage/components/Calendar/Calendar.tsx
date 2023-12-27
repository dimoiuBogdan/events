import { useEffect, useState } from "react";
import useCalendar from "../../data/hooks/useCalendar";
import CalendarDayNames from "./CalendarDayNames";
import CalendarMonth from "./CalendarMonth/CalendarMonth";
import CalendarToday from "./CalendarToday/CalendarToday";
import CalendarWeek from "./CalendarWeek";

const Calendar = () => {
  const { selectedDate, getDaysOfMonth } = useCalendar();

  const [daysInSelectedMonth, setDaysInSelectedMonth] = useState(
    getDaysOfMonth(selectedDate.month, selectedDate.year),
  );

  useEffect(() => {
    setDaysInSelectedMonth(
      getDaysOfMonth(selectedDate.month, selectedDate.year),
    );
  }, [getDaysOfMonth, selectedDate]);

  return (
    <div className="w-fit">
      <div className="flex items-center justify-between">
        <div></div>
        <CalendarMonth />
        <CalendarToday />
      </div>
      <CalendarDayNames />
      {daysInSelectedMonth.map((week, index) => (
        <CalendarWeek key={index} week={week} />
      ))}
    </div>
  );
};

export default Calendar;
