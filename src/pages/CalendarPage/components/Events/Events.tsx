import Loading from "../../../../common/components/Loading";
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
        <Loading />
      ) : (
        events?.map((event) => <Event key={event.id} {...event} />)
      )}
      <EventModal />
    </div>
  );
};

export default Events;
/*
 * DOCS :
 * Represents the list of events for a certain date
 * Holds the button for adding a new event
 * Holds the modal for viewing and editing a specific event
 */
