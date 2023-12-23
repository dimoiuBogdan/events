import dayjs from "dayjs";
import { FC, useCallback, useEffect, useState } from "react";
import { cn } from "../../../../common/data/utils";
import useCalendar from "../../data/hooks/useCalendar";
import {
  CalendarDateType,
  CalendarDayType,
} from "../../data/models/calendar.page.models";

type Props = {
  day: CalendarDayType;
};
const CalendarDay: FC<Props> = ({ day }) => {
  const { handleChangeSelectedDate, selectedDate, getEventsForSelectedDate } =
    useCalendar();
  const [eventsCount, setEventsCount] = useState(0);

  const selectedDateIsToday =
    dayjs().date() === day.date.date() &&
    dayjs().month() === day.date.month() &&
    dayjs().year() === day.date.year();

  const isSelected =
    selectedDate.day === day.date.date() &&
    selectedDate.month === day.date.month() &&
    selectedDate.year === day.date.year();

  const handleSelectDate = () => {
    if (isSelected) {
      handleChangeSelectedDate({
        day: undefined,
        month: selectedDate.month,
        year: selectedDate.year,
      });
    } else {
      handleChangeSelectedDate({
        day: day.date.date(),
        month: selectedDate.month,
        year: selectedDate.year,
      });
    }
  };

  const handleGetEventsForSelectedDate = useCallback(async () => {
    const calendarDate: CalendarDateType = {
      day: day.date.date(),
      month: day.date.month(),
      year: day.date.year(),
    };

    const events = await getEventsForSelectedDate(calendarDate);

    setEventsCount(events.length);
  }, [day.date, getEventsForSelectedDate]);

  useEffect(() => {
    handleGetEventsForSelectedDate();
  }, [handleGetEventsForSelectedDate]);

  return (
    <div
      onClick={handleSelectDate}
      className={cn(
        "relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-indigo-300 hover:text-white hover:shadow-md",
        selectedDateIsToday ? "bg-purple-400 text-white shadow-md" : "",
        isSelected ? "bg-indigo-400 text-white shadow-md" : "",
        !day.isCurrentMonth ? "text-gray-400" : "",
      )}
    >
      {!!eventsCount && (
        <div className="absolute -right-1 -top-1 flex h-3.5 w-3 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-orange-500">
          {eventsCount}
        </div>
      )}
      {day.date.format("D")}
    </div>
  );
};

export default CalendarDay;
