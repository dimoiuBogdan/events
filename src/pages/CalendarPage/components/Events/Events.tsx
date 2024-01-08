import Event from "./Event";
import EventModal from "./EventModal/EventModal";
import NewEvent from "./NewEvent/NewEvent";
import useEventsApi from "./data/hooks/useEvents.api";

const Events = () => {
  const { loadingEvents, events } = useEventsApi();

  return (
    <div className="flex flex-col gap-y-4">
      <NewEvent />
      {loadingEvents ? (
        <div>Loading...</div>
      ) : (
        events?.map((event) => <Event key={event.id} {...event} />)
      )}
      <EventModal />
    </div>
  );
};

export default Events;
