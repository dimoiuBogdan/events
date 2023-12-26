import { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import useCalendar from "../../data/hooks/useCalendar";
import { ShortEventType } from "./data/models/events.models";
import { EventsReducerActions } from "./data/reducers/events.reducer.actions";

type Props = ShortEventType;
const Event: FC<Props> = ({ id, name, from_date, to_date }) => {
  const dispatch = useAppDispatch();
  const { formatDate } = useCalendar();

  const selectedEventId = useAppSelector(
    (state) => state.eventsReducer.selectedEventId,
  );

  const setSelectedEventId = () => {
    dispatch(EventsReducerActions.selectEvent({ id }));
  };

  const unselectEvent = useCallback(() => {
    dispatch(EventsReducerActions.selectEvent({ id: undefined }));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      if (selectedEventId === id) {
        unselectEvent();
      }
    };
  }, [id, selectedEventId, unselectEvent]);

  return (
    <div
      onClick={setSelectedEventId}
      className="flex cursor-pointer items-center justify-between gap-x-2 rounded-md bg-indigo-400 px-4 py-1 shadow-md hover:bg-indigo-500"
    >
      <div>
        {formatDate(from_date, "HH:mm")} - {formatDate(to_date, "HH:mm")}
      </div>
      <div className="max-w-[130px] overflow-hidden truncate" title={name}>
        {name}
      </div>
    </div>
  );
};

export default Event;
