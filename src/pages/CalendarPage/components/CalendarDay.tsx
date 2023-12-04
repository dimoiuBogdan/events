import dayjs from "dayjs";
import { FC } from "react";
import { cn } from "../../../common/data/utils";
import { CalendarDayType } from "../data/calendar.page.models";

type Props = {
  day: CalendarDayType;
};
const CalendarDay: FC<Props> = ({ day }) => {
  const isToday =
    dayjs().date() === day.date.date() &&
    dayjs().month() === day.date.month() &&
    day.isCurrentMonth;

  return (
    <div
      className={cn(
        "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-indigo-300 hover:text-white hover:shadow-md",
        isToday ? "bg-indigo-400 text-white shadow-md" : "",
        !day.isCurrentMonth ? "text-gray-400" : "",
      )}
    >
      {day.date.format("D")}
    </div>
  );
};

export default CalendarDay;
