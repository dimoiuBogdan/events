import dayjs from "dayjs";
import { useCallback, useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import Loading from "../../../../../common/components/Loading";
import ModalWrapper from "../../../../../common/components/ModalWrapper";
import {
  formatEmptyValue,
  isRomanianPhoneNumber,
} from "../../../../../common/data/helpers/helpers";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import useCalendar from "../../../data/hooks/useCalendar";
import useEvents from "../data/hooks/useEvents";
import useEventsApi from "../data/hooks/useEvents.api";
import { EventsReducerActions } from "../data/reducers/events.reducer.actions";
import EventModalActionButtons from "./EventModalActionButtons/EventModalActionButtons";
import EventModalEditForm from "./EventModalEditForm/EventModalEditForm";

const EventModal = () => {
  const dispatch = useAppDispatch();
  const { formatDate } = useCalendar();
  const { setSelectedEventId } = useEvents();
  const { selectedEvent, loadingSelectedEvent } = useEventsApi();

  const selectedEventId = useAppSelector(
    (state) => state.eventsReducer.selectedEventId,
  );

  const isEditEventMode = useAppSelector<boolean>(
    (state) => state.eventsReducer.editEventMode,
  );

  const handleCloseModal = useCallback(() => {
    setSelectedEventId(undefined);

    dispatch(EventsReducerActions.setEditEventMode(false));
  }, [dispatch, setSelectedEventId]);

  useEffect(() => {
    return () => {
      handleCloseModal();
    };
  }, [handleCloseModal]);

  if (!selectedEventId || !selectedEvent) return <></>;

  const sameDayEvent =
    dayjs(selectedEvent.from_date).isSame(selectedEvent.to_date, "date") &&
    dayjs(selectedEvent.from_date).isSame(selectedEvent.to_date, "month") &&
    dayjs(selectedEvent.from_date).isSame(selectedEvent.to_date, "year");

  return (
    <ModalWrapper handleCloseModal={handleCloseModal}>
      {loadingSelectedEvent && selectedEventId ? (
        <Loading />
      ) : (
        <>
          <div className="mb-6 text-center text-lg font-medium">
            {selectedEvent.name}
          </div>
          {isEditEventMode ? (
            <EventModalEditForm />
          ) : (
            <div className="flex flex-col gap-y-2">
              <div>
                Date: {formatDate(selectedEvent.from_date, "DD.MM.YYYY")}
                {!sameDayEvent && selectedEvent.to_date && (
                  <span>
                    {" "}
                    - {formatDate(selectedEvent.to_date, "DD.MM.YYYY")}
                  </span>
                )}
              </div>
              <div>
                Time: {formatDate(selectedEvent.from_date, "HH:mm")} -{" "}
                {selectedEvent.to_date &&
                  formatDate(selectedEvent.to_date, "HH:mm")}
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
          )}
        </>
      )}
    </ModalWrapper>
  );
};

export default EventModal;
/*
 * DOCS :
 * Represents the modal for a specific event
 */
