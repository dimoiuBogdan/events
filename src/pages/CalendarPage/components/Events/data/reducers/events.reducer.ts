import { Reducer, getType } from "typesafe-actions";
import {
  EventsReducerAction,
  EventsReducerActions,
} from "./events.reducer.actions";
import {
  EventsInitialStateInterface,
  EventsReducerInitialState,
} from "./events.reducer.initialState";

export const eventsReducer: Reducer<
  EventsInitialStateInterface,
  EventsReducerAction
> = (
  state: EventsInitialStateInterface = EventsReducerInitialState,
  action: EventsReducerAction,
) => {
  switch (action.type) {
    case getType(EventsReducerActions.selectEvent):
      return {
        ...state,
        selectedEventId: action.payload.id,
      };
    case getType(EventsReducerActions.setEditEventMode):
      return {
        ...state,
        editEventMode: action.payload,
      };
    default:
      return state;
  }
};
