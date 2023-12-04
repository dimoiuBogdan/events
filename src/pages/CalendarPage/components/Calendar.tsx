import { useCallback, useEffect, useState } from "react";
import useCalendar from "../data/hooks/useCalendar";
import CalendarDayNames from "./CalendarDayNames";
import CalendarMonth from "./CalendarMonth/CalendarMonth";
import CalendarWeek from "./CalendarWeek";

const Calendar = () => {
  const { selectedMonth, getDaysOfMonth } = useCalendar();

  const getDaysOfMonthMemoized = useCallback(getDaysOfMonth, []);

  const [daysInSelectedMonth, setDaysInSelectedMonth] = useState(
    getDaysOfMonthMemoized(selectedMonth),
  );

  useEffect(() => {
    setDaysInSelectedMonth(getDaysOfMonthMemoized(selectedMonth));
  }, [getDaysOfMonthMemoized, selectedMonth]);

  return (
    <div className="w-fit">
      <CalendarMonth />
      <CalendarDayNames />
      {daysInSelectedMonth.map((week, index) => (
        <CalendarWeek key={index} week={week} />
      ))}
    </div>
  );
};

export default Calendar;
