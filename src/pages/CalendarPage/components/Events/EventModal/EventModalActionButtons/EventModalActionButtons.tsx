import { FC } from "react";
import { isRomanianPhoneNumber } from "../../../../../../common/data/helpers/helpers";
import { useAppDispatch } from "../../../../../../redux/hooks";
import useEventsApi from "../../data/hooks/useEvents.api";
import { EventType } from "../../data/models/events.models";
import { EventsReducerActions } from "../../data/reducers/events.reducer.actions";
import EventModalActionButton from "./EventModalActionButton";

type Props = {
  selectedEvent?: EventType;
  handleCloseModal: () => void;
};
const EventModalActionButtons: FC<Props> = ({
  handleCloseModal,
  selectedEvent,
}) => {
  const dispatch = useAppDispatch();
  const { removeEventRequest, sendMessageRequest } = useEventsApi();

  const canNotify =
    selectedEvent?.contact && isRomanianPhoneNumber(selectedEvent.contact);

  return (
    <div className="mt-6 flex items-center justify-evenly">
      <EventModalActionButton
        backgroundColor="bg-red-500"
        onClick={() =>
          removeEventRequest.mutate(undefined, {
            onSuccess: handleCloseModal,
          })
        }
        content="Remove"
      />
      <EventModalActionButton
        backgroundColor="bg-orange-400"
        onClick={() => dispatch(EventsReducerActions.setEditEventMode(true))}
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
/*
 * DOCS :
 * Represents the action buttons for the specific event modal
 * Reponsible for removing, editing and notifying the event
 */
