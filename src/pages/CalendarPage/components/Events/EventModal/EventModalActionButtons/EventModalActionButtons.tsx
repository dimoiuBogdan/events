import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { NotificationsReducerActions } from "../../../../../../common/components/Notifications.tsx/data/reducers/notifications.reducer.actions";
import { TWILIO } from "../../../../../../common/data/constants";
import { isRomanianPhoneNumber } from "../../../../../../common/data/helpers/helpers";
import { useAppDispatch } from "../../../../../../redux/hooks";
import useCalendar from "../../../../data/hooks/useCalendar";
import { EventType } from "../../data/models/events.models";
import { removeEvent } from "../../data/services/events.services";
import { sendMessage } from "../../data/services/messages.services";
import EventModalActionButton from "./EventModalActionButton";

type Props = {
  selectedEvent?: EventType;
  handleCloseModal: () => void;
};
const EventModalActionButtons: FC<Props> = ({
  handleCloseModal,
  selectedEvent,
}) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { formatDate } = useCalendar();

  const canNotify =
    selectedEvent?.contact && isRomanianPhoneNumber(selectedEvent.contact);

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

      handleCloseModal();
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

      handleCloseModal();
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

  return (
    <div className="mt-6 flex items-center justify-evenly">
      <EventModalActionButton
        backgroundColor="bg-red-500"
        onClick={() => removeEventRequest.mutate()}
        content="Remove"
      />
      <EventModalActionButton
        backgroundColor="bg-orange-400"
        onClick={() => {}}
        content="Edit"
      />
      <EventModalActionButton
        backgroundColor="bg-green-500"
        onClick={() => sendMessageRequest.mutate()}
        content="Notify"
        disabled={!canNotify}
        tooltipMessage="Contact is not a valid phone number"
      />
    </div>
  );
};

export default EventModalActionButtons;
