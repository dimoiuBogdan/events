import useCalendar from "../../data/hooks/useCalendar";
import CalendarDayNames from "./CalendarDay/components/CalendarDayNames";
import CalendarMonth from "./CalendarMonth/CalendarMonth";
import CalendarToday from "./CalendarToday/CalendarToday";
import CalendarWeek from "./CalendarWeek";

const Calendar = () => {
  const { selectedDate, getDaysOfMonth } = useCalendar();

  const daysInSelectedMonth = getDaysOfMonth(
    selectedDate.month,
    selectedDate.year,
  );

  return (
    <div>
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
