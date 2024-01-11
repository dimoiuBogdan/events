import { ActionType, createAction } from "typesafe-actions";

const actions = {
  selectEvent: createAction(
    "selectEvent",
    (payload: { id: string | undefined }) => payload,
  )(),
  setEditEventMode: createAction(
    "setEditEventMode",
    (payload: boolean) => payload,
  )(),
};

export type EventsReducerAction = ActionType<typeof actions>;
export const EventsReducerActions = actions;
