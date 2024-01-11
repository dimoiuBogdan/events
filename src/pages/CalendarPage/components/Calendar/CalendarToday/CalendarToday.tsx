import dayjs from "dayjs";
import CalendarDay from "../CalendarDay/components/CalendarDay";

const CalendarToday = () => {
  return (
    <CalendarDay isTodayButton day={{ date: dayjs(), isCurrentMonth: false }} />
  );
};

export default CalendarToday;
/*
 * DOCS :
 * Represents a shortcut to the current day
 * Responsible for navigating to the current day
 */
