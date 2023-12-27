import dayjs from "dayjs";
import CalendarDay from "../CalendarDay";

const CalendarToday = () => {
  return (
    <CalendarDay isTodayButton day={{ date: dayjs(), isCurrentMonth: false }} />
  );
};

export default CalendarToday;
