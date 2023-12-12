import { FaPhone } from "react-icons/fa";
import ModalWrapper from "../../../../../common/components/ModalWrapper";
import { EVENTS } from "../../../../../common/data/constants";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import useCalendar from "../../../data/hooks/useCalendar";
import { EventsReducerActions } from "../data/reducers/events.reducer.actions";
import EventModalActionButtons from "./EventModalActionButtons/EventModalActionButtons";

const EventModal = () => {
  const dispatch = useAppDispatch();
  const { formatDate } = useCalendar();

  const selectedEventId = useAppSelector(
    (state) => state.eventsReducer.selectedEventId,
  );

  const selectedEvent = EVENTS.find((event) => event.id === selectedEventId);

  const isRomanianPhoneNumber = (phoneNumber: string) => {
    const regex = /^(\+4|0)(\d{9})$/;

    return regex.test(phoneNumber);
  };

  const handleCloseModal = () => {
    dispatch(EventsReducerActions.selectEvent({ id: undefined }));
  };

  if (!selectedEventId || !selectedEvent) return <></>;

  return (
    <ModalWrapper handleCloseModal={handleCloseModal}>
      <div className="mb-6 text-center text-lg font-medium">
        {selectedEvent.name}
      </div>
      <div className="flex flex-col gap-y-2">
        <div>
          Date: {formatDate(selectedEvent.from, "DD.MM.YYYY")} -{" "}
          {formatDate(selectedEvent.to, "DD.MM.YYYY")}
        </div>
        <div>
          Time: {formatDate(selectedEvent.from, "HH:mm")} -{" "}
          {formatDate(selectedEvent.to, "HH:mm")}
        </div>
        {selectedEvent.location && (
          <div>Location: {selectedEvent.location}</div>
        )}
        {selectedEvent.contact && (
          <div className="flex items-center gap-x-1">
            Contact:{" "}
            {isRomanianPhoneNumber(selectedEvent.contact) ? (
              <a
                href={`tel:${selectedEvent.contact}`}
                className="flex items-center gap-x-2"
              >
                {selectedEvent.contact}
                <FaPhone className="text-sm text-indigo-400" />
              </a>
            ) : (
              <span>{selectedEvent.contact}</span>
            )}
          </div>
        )}
        {selectedEvent.description && (
          <div className="max-h-36 overflow-y-auto">
            Description: {selectedEvent.description}
          </div>
        )}
        <EventModalActionButtons />
      </div>
    </ModalWrapper>
  );
};

export default EventModal;
