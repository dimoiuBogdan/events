import { Reducer, getType } from "typesafe-actions";
import {
  EventsInitialStateInterface,
  EventsReducerInitialState,
} from "./events.preducer.initialState";
import {
  EventsReducerAction,
  EventsReducerActions,
} from "./events.reducer.actions";

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
    default:
      return state;
  }
};
