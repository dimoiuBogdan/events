import dayjs from "dayjs";
import { FaPhone } from "react-icons/fa";
import { useQuery } from "react-query";
import ModalWrapper from "../../../../../common/components/ModalWrapper";
import { isRomanianPhoneNumber } from "../../../../../common/data/helpers/helpers";
import { formatEmptyValue } from "../../../../../common/data/utils";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import useCalendar from "../../../data/hooks/useCalendar";
import { EventsReducerActions } from "../data/reducers/events.reducer.actions";
import { getEventById } from "../data/services/events.services";
import EventModalActionButtons from "./EventModalActionButtons/EventModalActionButtons";

const EventModal = () => {
  const dispatch = useAppDispatch();
  const { formatDate } = useCalendar();

  const selectedEventId = useAppSelector(
    (state) => state.eventsReducer.selectedEventId,
  );

  const { data: selectedEvent, isLoading: loadingSelectedEvent } = useQuery({
    queryKey: ["get-specific-event", selectedEventId],
    queryFn: async () => {
      if (!selectedEventId) return;

      const res = await getEventById(selectedEventId);

      return res;
    },
  });

  const handleCloseModal = () => {
    dispatch(EventsReducerActions.selectEvent({ id: undefined }));
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
