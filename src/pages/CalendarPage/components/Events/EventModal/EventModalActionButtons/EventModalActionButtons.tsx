import { FC } from "react";
import { isRomanianPhoneNumber } from "../../../../../../common/data/helpers/helpers";
import useEventsApi from "../../data/hooks/useEvents.api";
import { EventType } from "../../data/models/events.models";
import EventModalActionButton from "./EventModalActionButton";

type Props = {
  selectedEvent?: EventType;
  handleCloseModal: () => void;
};
const EventModalActionButtons: FC<Props> = ({
  handleCloseModal,
  selectedEvent,
}) => {
  const { removeEventRequest, sendMessageRequest } = useEventsApi();

  const canNotify =
    selectedEvent?.contact && isRomanianPhoneNumber(selectedEvent.contact);

  return (
    <div className="mt-6 flex items-center justify-evenly">
      <EventModalActionButton
        backgroundColor="bg-red-500"
        onClick={() =>
          removeEventRequest.mutate(undefined, { onSuccess: handleCloseModal })
        }
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
        tooltipMessage={
          canNotify ? undefined : "Contact is not a valid phone number"
        }
      />
    </div>
  );
};

export default EventModalActionButtons;
