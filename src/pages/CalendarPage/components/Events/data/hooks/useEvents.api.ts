import {
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { NotificationsReducerActions } from "../../../../../../common/components/Notifications.tsx/data/reducers/notifications.reducer.actions";
import { TWILIO } from "../../../../../../common/data/constants";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import useCalendar from "../../../../data/hooks/useCalendar";
import { mapEvents } from "../helpers/events.helper";
import { EventType, NewEventType } from "../models/events.models";
import { EventsReducerActions } from "../reducers/events.reducer.actions";
import {
  addEvent,
  getEventById,
  getEvents,
  removeEvent,
} from "../services/events.services";
import { sendMessage } from "../services/messages.services";

export const EVENTS_QUERY_KEYS = {
  getSelectedDateEvents: "get-selected-date-events",
  getAllEvents: "get-all-events",
  getSpecificEvent: "get-specific-event",
};

type ReturnProps = {
  events: EventType[] | undefined;
  loadingEvents: boolean;
  selectedEvent: EventType | undefined;
  loadingSelectedEvent: boolean;
  addEventRequest: UseMutationResult<void, unknown, NewEventType, unknown>;
  sendMessageRequest: UseMutationResult<void, unknown, void, unknown>;
  removeEventRequest: UseMutationResult<void, unknown, void, unknown>;
};
const useEventsApi = (): ReturnProps => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { formatDate } = useCalendar();

  const selectedEventId = useAppSelector(
    (state) => state.eventsReducer.selectedEventId,
  );

  const { getEventsForSelectedDate, selectedDate } = useCalendar();

  const { data: events, isLoading: loadingEvents } = useQuery({
    queryKey: [EVENTS_QUERY_KEYS.getSelectedDateEvents, selectedDate],
    queryFn: async () => {
      const res = await getEventsForSelectedDate(selectedDate);

      return res;
    },
  });

  const { data: selectedEvent, isLoading: loadingSelectedEvent } = useQuery({
    queryKey: [EVENTS_QUERY_KEYS.getSpecificEvent, selectedEventId],
    queryFn: async () => {
      if (!selectedEventId) return;

      const res = await getEventById(selectedEventId);

      return res;
    },
  });

  const addEventRequest = useMutation({
    mutationFn: async (newEvent: NewEventType) => {
      await addEvent(newEvent);
    },
    onSuccess: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "success",
          title: "Event added!",
          message: "The event will now appear in your calendar!",
        }),
      );

      queryClient.invalidateQueries(EVENTS_QUERY_KEYS.getAllEvents);
      queryClient.invalidateQueries(EVENTS_QUERY_KEYS.getSelectedDateEvents);
    },
    onError: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Failed to add event!",
          message: "The event could not be added!",
        }),
      );
    },
  });

  const sendMessageRequest = useMutation({
    mutationFn: async () => {
      if (!selectedEvent) return;

      await sendMessage(
        `${selectedEvent.name} - ${formatDate(
          selectedEvent.from_date,
          "DD.MM.YYYY HH:mm",
        )}`,
        TWILIO.TO,
        TWILIO.FROM,
      );
    },
    onSuccess: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "success",
          title: "Message sent!",
          message: "Client notified through SMS!",
        }),
      );
    },
    onError: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Failed to send message!",
          message: "The message was not sent!",
        }),
      );
    },
  });

  const removeEventRequest = useMutation({
    mutationFn: async () => {
      if (!selectedEvent) return;

      await removeEvent(selectedEvent.id);
    },
    onSuccess: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "success",
          title: "Event removed!",
          message: "The event has been removed!",
        }),
      );

      queryClient.invalidateQueries("get-all-events");
      queryClient.invalidateQueries("get-selected-date-events");
    },
    onError: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Failed to remove event!",
          message: "The event could not be removed!",
        }),
      );
    },
  });

  useQuery({
    queryKey: [EVENTS_QUERY_KEYS.getAllEvents],
    queryFn: async () => {
      const res = await getEvents();

      return res;
    },
    onSuccess: (data) => {
      const mappedEventsLengths = mapEvents(data);

      dispatch(EventsReducerActions.setEventsLengths(mappedEventsLengths));
    },
  });

  return {
    events,
    loadingEvents,
    selectedEvent,
    loadingSelectedEvent,
    addEventRequest,
    sendMessageRequest,
    removeEventRequest,
  };
};

export default useEventsApi;
