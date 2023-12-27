import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { EventsReducerActions } from "../reducers/events.reducer.actions";

type ReturnProps = {
  setSelectedEventId: (id: string | undefined) => void;
};
const useEvents = (): ReturnProps => {
  const dispatch = useDispatch();

  const setSelectedEventId = useCallback(
    (id: string | undefined) => {
      dispatch(EventsReducerActions.selectEvent({ id }));
    },
    [dispatch],
  );

  return { setSelectedEventId };
};

export default useEvents;
