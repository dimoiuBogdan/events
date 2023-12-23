import { useEffect, useState } from "react";
import useCalendar from "../../data/hooks/useCalendar";
import Event from "./Event";
import EventModal from "./EventModal/EventModal";
import NewEvent from "./NewEvent/NewEvent";
import { EventType } from "./data/models/events.models";

const Events = () => {
  const { getEventsForSelectedDate, selectedDate } = useCalendar();
  const [events, setEvents] = useState<EventType[]>([]);

  const getEvents = async () => {
    const eventsForSelectedDate = await getEventsForSelectedDate(selectedDate);

    setEvents(eventsForSelectedDate);
  };

  useEffect(() => {
    getEvents();
  }, [selectedDate]);

  return (
    <div className="flex flex-col gap-y-4">
      {events.map((event) => (
        <Event key={event.id} {...event} />
      ))}
      <NewEvent />
      <EventModal />
    </div>
  );
};

export default Events;
