import { FC } from "react";
import { CalendarDayType } from "../../data/calendar.page.models";
import CalendarDay from "./CalendarDay";

type Props = {
  week: CalendarDayType[];
};
const CalendarWeek: FC<Props> = ({ week }) => {
  return (
    <div className="mb-1 grid grid-cols-7 gap-2">
      {week.map((day, index) => (
        <CalendarDay key={index} day={day} />
      ))}
    </div>
  );
};

export default CalendarWeek;
