import dayjs from "dayjs";
import { FC } from "react";
import { cn } from "../../../../common/data/utils";
import { useAppSelector } from "../../../../redux/hooks";
import useCalendar from "../../data/hooks/useCalendar";
import { CalendarDayType } from "../../data/models/calendar.page.models";
import { EventsLengthsType } from "../Events/data/models/events.models";

type Props = {
  day: CalendarDayType;
};
const CalendarDay: FC<Props> = ({ day }) => {
  const { handleChangeSelectedDate, selectedDate } = useCalendar();

  const eventsLengths = useAppSelector<EventsLengthsType[]>(
    (s) => s.eventsReducer.eventsLengths,
  );

  const isToday =
    dayjs().date() === day.date.date() &&
    dayjs().month() === day.date.month() &&
    dayjs().year() === day.date.year();

  const isSelected =
    selectedDate.day === day.date.date() &&
    selectedDate.month === day.date.month() &&
    selectedDate.year === day.date.year();

  const currentDayEventsLengths = eventsLengths.find(
    (event) =>
      dayjs(event.from_date).date() === day.date.date() &&
      dayjs(event.from_date).month() === day.date.month() &&
      dayjs(event.from_date).year() === day.date.year(),
  )?.events;

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

  return (
    <div
      onClick={handleSelectDate}
      className={cn(
        "relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-indigo-300 hover:text-white hover:shadow-md",
        !!isToday && "bg-red-400 text-white shadow-md",
        !!isSelected && "bg-indigo-400 text-white shadow-md",
        !day.isCurrentMonth && "text-gray-400",
      )}
    >
      {!!currentDayEventsLengths && (
        <div className="absolute -right-1 -top-1 flex h-3.5 w-3 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-orange-500">
          {currentDayEventsLengths}
        </div>
      )}
      {day.date.format("D")}
    </div>
  );
};

export default CalendarDay;
