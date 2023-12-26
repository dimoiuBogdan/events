import { useQuery } from "react-query";
import { useAppDispatch } from "../../../../redux/hooks";
import useCalendar from "../../data/hooks/useCalendar";
import Event from "./Event";
import EventModal from "./EventModal/EventModal";
import NewEvent from "./NewEvent/NewEvent";
import { mapEvents } from "./data/helpers/events.helper";
import { EventsReducerActions } from "./data/reducers/events.reducer.actions";
import { getEvents } from "./data/services/events.services";

const Events = () => {
  const dispatch = useAppDispatch();
  const { getEventsForSelectedDate, selectedDate } = useCalendar();

  const { data: events, isLoading: loadingEvents } = useQuery({
    queryKey: ["get-selected-date-events", selectedDate],
    queryFn: async () => {
      const res = await getEventsForSelectedDate(selectedDate);

      return res;
    },
  });

  useQuery({
    queryKey: ["get-all-events"],
    queryFn: async () => {
      const res = await getEvents();

      return res;
    },
    onSuccess: (data) => {
      const mappedEventsLengths = mapEvents(data);

      dispatch(EventsReducerActions.setEventsLengths(mappedEventsLengths));
    },
  });

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
