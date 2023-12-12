import { FC } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import useCalendar from "../../data/hooks/useCalendar";
import { ShortEventType } from "./data/events.models";
import { EventsReducerActions } from "./data/reducers/events.reducer.actions";

type Props = ShortEventType;
const Event: FC<Props> = ({ id, name, from, to }) => {
  const dispatch = useAppDispatch();
  const { formatDate } = useCalendar();

  const setselectedEventId = () => {
    dispatch(EventsReducerActions.selectEvent({ id }));
  };

  return (
    <div
      onClick={setselectedEventId}
      className="flex cursor-pointer items-center justify-between gap-x-2 rounded-md bg-indigo-400 px-4 py-1 shadow-md hover:bg-indigo-500"
    >
      <div>
        {formatDate(from, "HH:mm")} - {formatDate(to, "HH:mm")}
      </div>
      <div className="max-w-[130px] overflow-hidden truncate" title={name}>
        {name}
      </div>
    </div>
  );
};

export default Event;
