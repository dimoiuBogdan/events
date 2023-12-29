import dayjs from "dayjs";
import { FaPhone } from "react-icons/fa";
import ModalWrapper from "../../../../../common/components/ModalWrapper";
import {
  formatEmptyValue,
  isRomanianPhoneNumber,
} from "../../../../../common/data/helpers/helpers";
import { useAppSelector } from "../../../../../redux/hooks";
import useCalendar from "../../../data/hooks/useCalendar";
import useEvents from "../data/hooks/useEvents";
import useEventsApi from "../data/hooks/useEvents.api";
import EventModalActionButtons from "./EventModalActionButtons/EventModalActionButtons";

const EventModal = () => {
  const { formatDate } = useCalendar();
  const { setSelectedEventId } = useEvents();
  const { selectedEvent, loadingSelectedEvent } = useEventsApi();

  const selectedEventId = useAppSelector(
    (state) => state.eventsReducer.selectedEventId,
  );

  const handleCloseModal = () => {
    setSelectedEventId(undefined);
  };

  if (!selectedEventId || !selectedEvent) return <></>;

  const sameDayEvent =
    dayjs(selectedEvent.from_date).isSame(selectedEvent.to_date, "date") &&
    dayjs(selectedEvent.from_date).isSame(selectedEvent.to_date, "month") &&
    dayjs(selectedEvent.from_date).isSame(selectedEvent.to_date, "year");

  return (
    <ModalWrapper handleCloseModal={handleCloseModal}>
      {loadingSelectedEvent && selectedEventId ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="mb-6 text-center text-lg font-medium">
            {selectedEvent.name}
          </div>
          <div className="flex flex-col gap-y-2">
            <div>
              Date: {formatDate(selectedEvent.from_date, "DD.MM.YYYY")}
              {!sameDayEvent && (
                <span>
                  {" "}
                  - {formatDate(selectedEvent.to_date, "DD.MM.YYYY")}
                </span>
              )}
            </div>
            <div>
              Time: {formatDate(selectedEvent.from_date, "HH:mm")} -{" "}
              {formatDate(selectedEvent.to_date, "HH:mm")}
            </div>
            <div>Location: {formatEmptyValue(selectedEvent.location)}</div>
            <div className="flex items-center gap-x-1">
              Contact:{" "}
              {selectedEvent.contact &&
              isRomanianPhoneNumber(selectedEvent.contact) ? (
                <a
                  href={`tel:${selectedEvent.contact}`}
                  className="flex items-center gap-x-2"
                >
                  {selectedEvent.contact}
                  <FaPhone className="text-sm text-indigo-400" />
                </a>
              ) : (
                <span>{formatEmptyValue(selectedEvent.contact)}</span>
              )}
            </div>
            <div className="max-h-36 overflow-y-auto">
              Description: {formatEmptyValue(selectedEvent.description)}
            </div>
            <EventModalActionButtons
              selectedEvent={selectedEvent}
              handleCloseModal={handleCloseModal}
            />
          </div>
        </>
      )}
    </ModalWrapper>
  );
};

export default EventModal;
