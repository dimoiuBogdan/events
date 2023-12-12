import useCalendar from "../../data/hooks/useCalendar";
import Event from "./Event";
import EventModal from "./EventModal/EventModal";
import NewEvent from "./NewEvent/NewEvent";

const Events = () => {
  const { getEventsForSelectedDate, selectedDate } = useCalendar();

  const eventsForSelectedDate = getEventsForSelectedDate(selectedDate.day);

  return (
    <div className="flex flex-col gap-y-4">
      {eventsForSelectedDate.map((event) => (
        <Event key={event.id} {...event} />
      ))}
      <NewEvent />
      <EventModal />
    </div>
  );
};

export default Events;
