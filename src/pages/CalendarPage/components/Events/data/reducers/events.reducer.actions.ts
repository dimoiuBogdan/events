import { ActionType, createAction } from "typesafe-actions";
import { EventsLengthsType } from "../models/events.models";

const actions = {
  selectEvent: createAction(
    "selectEvent",
    (payload: { id: string | undefined }) => payload,
  )(),
  setEventsLengths: createAction(
    "setEventsLengths",
    (payload: EventsLengthsType[]) => payload,
  )(),
  setEditEventMode: createAction(
    "setEditEventMode",
    (payload: boolean) => payload,
  )(),
};

export type EventsReducerAction = ActionType<typeof actions>;
export const EventsReducerActions = actions;
