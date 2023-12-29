import { FC } from "react";
import { cn } from "../../../../../../common/data/helpers/helpers";
import { useAppSelector } from "../../../../../../redux/hooks";
import { CalendarDayType } from "../../../../data/models/calendar.page.models";
import { EventsLengthsType } from "../../../Events/data/models/events.models";
import { getCurrentDayEventsLengths } from "../data/helpers/calendar-day.helper";

type Props = { day: CalendarDayType };
const CalendarDayEventsLengths: FC<Props> = ({ day }) => {
  const eventsLengths = useAppSelector<EventsLengthsType[]>(
    (s) => s.eventsReducer.eventsLengths,
  );

  const currentDayEventsLengths = getCurrentDayEventsLengths(
    eventsLengths,
    day,
  );

  if (!currentDayEventsLengths) return <></>;

  return (
    <div
      className={cn(
        "absolute -right-1 -top-1 flex h-3.5 w-3 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-orange-500",
      )}
    >
      {currentDayEventsLengths}
    </div>
  );
};

export default CalendarDayEventsLengths;
