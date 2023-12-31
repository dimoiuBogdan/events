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
import {
  EventEditType,
  EventType,
  NewEventType,
} from "../models/events.models";
import { EventsReducerActions } from "../reducers/events.reducer.actions";
import {
  addEvent,
  getEventById,
  getEvents,
  removeEvent,
  updateEvent,
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
  addEventRequest: UseMutationResult<EventType, unknown, NewEventType, unknown>;
  sendMessageRequest: UseMutationResult<void, unknown, void, unknown>;
  removeEventRequest: UseMutationResult<boolean, unknown, void, unknown>;
  updateEventRequest: UseMutationResult<
    boolean,
    unknown,
    EventEditType,
    unknown
  >;
};
const useEventsApi = (): ReturnProps => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { getEventsForSelectedDate, selectedDate, formatDate } = useCalendar();

  const selectedEventId = useAppSelector(
    (state) => state.eventsReducer.selectedEventId,
  );

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
      const res = await addEvent(newEvent);

      return res;
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

      const res = await sendMessage(
        `${selectedEvent.name} - ${formatDate(
          selectedEvent.from_date,
          "DD.MM.YYYY HH:mm",
        )}`,
        TWILIO.TO,
        TWILIO.FROM,
      );

      return res;
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
      if (!selectedEvent) return false;

      const res = await removeEvent(selectedEvent.id);

      return res;
    },
    onSuccess: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "success",
          title: "Event removed!",
          message: "The event has been removed!",
        }),
      );

      queryClient.invalidateQueries(EVENTS_QUERY_KEYS.getAllEvents);
      queryClient.invalidateQueries(EVENTS_QUERY_KEYS.getSelectedDateEvents);
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

  const updateEventRequest = useMutation({
    mutationFn: async (updatedEvent: EventEditType) => {
      if (!selectedEvent) return false;

      const res = await updateEvent(selectedEvent.id, updatedEvent);

      return res;
    },
    onSuccess: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "success",
          title: "Event updated!",
          message: "The event has been updated!",
        }),
      );

      queryClient.invalidateQueries(EVENTS_QUERY_KEYS.getSelectedDateEvents);
      queryClient.invalidateQueries(EVENTS_QUERY_KEYS.getSpecificEvent);
    },
    onError: () => {
      dispatch(
        NotificationsReducerActions.addNotification({
          type: "error",
          title: "Failed to update event!",
          message: "The event could not be updated!",
        }),
      );
    },
  });

  useQuery({
    queryKey: [EVENTS_QUERY_KEYS.getAllEvents],
    staleTime: Infinity,
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
    updateEventRequest,
  };
};

export default useEventsApi;
