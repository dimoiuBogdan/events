import { FC } from "react";
import { cn } from "../../../../../../common/data/helpers/helpers";
import useCalendar from "../../../../data/hooks/useCalendar";
import { CalendarDayType } from "../../../../data/models/calendar.page.models";
import {
  getIsSelected,
  getIsToday,
  mapDayToSelectedDate,
} from "../data/helpers/calendar-day.helper";
import CalendarDayEventsLengths from "./CalendarDayEventsLengths";

type Props = {
  day: CalendarDayType;
  isTodayButton?: boolean;
};
const CalendarDay: FC<Props> = ({ day, isTodayButton }) => {
  const { handleChangeSelectedDate, selectedDate } = useCalendar();

  const isToday = getIsToday(day);

  const isSelected = getIsSelected(day, selectedDate);

  const mappedDayToSelectedDate = mapDayToSelectedDate(day);

  const handleSelectDate = () => {
    if (isTodayButton) {
      handleChangeSelectedDate(mappedDayToSelectedDate);

      return;
    }

    if (isSelected) {
      handleChangeSelectedDate({
        day: undefined,
      });
    } else {
      handleChangeSelectedDate(mappedDayToSelectedDate);
    }
  };

  return (
    <div
      onClick={handleSelectDate}
      className={cn(
        "relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-indigo-300 hover:text-white hover:shadow-md",
        !!isToday && "bg-red-400 text-white shadow-md",
        !!isSelected && "bg-indigo-400 text-white shadow-md",
        !day.isCurrentMonth && !isTodayButton && "text-gray-400",
      )}
    >
      <CalendarDayEventsLengths day={day} />
      {day.date.format("D")}
    </div>
  );
};

export default CalendarDay;
/*
 * DOCS :
 * Represents a day in the calendar
 * Responsible for selecting a certain day and updating events list
 * Responsible for displaying correct styling based on certain conditions
 */
