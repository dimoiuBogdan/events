import Event from "./Event";
import EventModal from "./EventModal/EventModal";
import NewEvent from "./NewEvent/NewEvent";
import useEventsApi from "./data/hooks/useEvents.api";

const Events = () => {
  const { loadingEvents, events } = useEventsApi();

  if (loadingEvents) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-y-4">
      {events?.map((event) => <Event key={event.id} {...event} />)}
      <NewEvent />
      <EventModal />
    </div>
  );
};

export default Events;
