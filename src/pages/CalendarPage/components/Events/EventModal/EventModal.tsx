import { FaPhone } from "react-icons/fa";
import { useQuery } from "react-query";
import ModalWrapper from "../../../../../common/components/ModalWrapper";
import { isRomanianPhoneNumber } from "../../../../../common/data/helpers/helpers";
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

  if (loadingSelectedEvent && selectedEventId) {
    return <div>Loading...</div>;
  }

  if (!selectedEventId || !selectedEvent) return <></>;

  return (
    <ModalWrapper handleCloseModal={handleCloseModal}>
      <div className="mb-6 text-center text-lg font-medium">
        {selectedEvent.name}
      </div>
      <div className="flex flex-col gap-y-2">
        <div>
          Date: {formatDate(selectedEvent.from_date, "DD.MM.YYYY")} -{" "}
          {formatDate(selectedEvent.to_date, "DD.MM.YYYY")}
        </div>
        <div>
          Time: {formatDate(selectedEvent.from_date, "HH:mm")} -{" "}
          {formatDate(selectedEvent.to_date, "HH:mm")}
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
        <EventModalActionButtons handleCloseModal={handleCloseModal} />
      </div>
    </ModalWrapper>
  );
};

export default EventModal;
