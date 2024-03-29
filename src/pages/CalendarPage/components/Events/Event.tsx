import { FC, useRef } from "react";
import useCalendar from "../../data/hooks/useCalendar";
import useEvents from "./data/hooks/useEvents";
import { ShortEventType } from "./data/models/events.models";

type Props = ShortEventType;
const Event: FC<Props> = ({ id, name, from_date, to_date }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const { formatDate } = useCalendar();
  const { setSelectedEventId } = useEvents();

  const getEventDate = () => {
    const fromDate = formatDate(from_date, "HH:mm");
    const toDate = to_date ? ` - ${formatDate(to_date, "HH:mm")}` : "";

    return `${fromDate} ${toDate}`;
  };

  return (
    <div
      onClick={() => setSelectedEventId(id)}
      className="flex cursor-pointer items-center justify-between gap-x-2 rounded-md bg-indigo-400 px-4 py-1 shadow-md hover:bg-indigo-500"
    >
      <div>{getEventDate()}</div>
      <div
        ref={titleRef}
        id={name}
        className="max-w-[130px] overflow-hidden truncate"
      >
        {name}
      </div>
    </div>
  );
};

export default Event;
/*
 * DOCS :
 * Represents the single event component
 * Responsible for opening the specific event modal
 */
