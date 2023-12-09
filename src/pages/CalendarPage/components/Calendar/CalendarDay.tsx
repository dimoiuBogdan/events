import dayjs from "dayjs";
import { FC } from "react";
import { cn } from "../../../../common/data/utils";
import { CalendarDayType } from "../../data/calendar.page.models";
import useCalendar from "../../data/hooks/useCalendar";

type Props = {
  day: CalendarDayType;
};
const CalendarDay: FC<Props> = ({ day }) => {
  const { handleChangeSelectedDate, selectedDate } = useCalendar();

  const selectedDateIsToday =
    dayjs().date() === day.date.date() &&
    dayjs().month() === day.date.month() &&
    dayjs().year() === day.date.year();

  const isSelected =
    selectedDate.day === day.date.date() &&
    selectedDate.month === day.date.month() &&
    selectedDate.year === day.date.year();

  return (
    <div
      onClick={() =>
        handleChangeSelectedDate({
          day: day.date.date(),
          month: selectedDate.month,
          year: selectedDate.year,
        })
      }
      className={cn(
        "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-indigo-300 hover:text-white hover:shadow-md",
        selectedDateIsToday ? "bg-purple-400 text-white shadow-md" : "",
        isSelected ? "bg-indigo-400 text-white shadow-md" : "",
        !day.isCurrentMonth ? "text-gray-400" : "",
      )}
    >
      {day.date.format("D")}
    </div>
  );
};

export default CalendarDay;
