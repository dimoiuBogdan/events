import { EVENTS } from "../../../../common/data/constants";
import useCalendar from "../../data/hooks/useCalendar";
import Event from "./Event";

const Events = () => {
  const { selectedDate } = useCalendar();

  const eventsForSelectedDate = EVENTS.filter(
    (event) => event.from.getDate() === selectedDate.day,
  );

  return (
    <div className="flex flex-col gap-y-4">
      {eventsForSelectedDate.map((event) => (
        <Event
          key={event.id}
          name={event.name}
          from={event.from}
          to={event.to}
        />
      ))}
    </div>
  );
};

export default Events;
