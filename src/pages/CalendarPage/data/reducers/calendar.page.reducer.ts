import { Reducer, getType } from "typesafe-actions";
import {
  CalendarPageReducerAction,
  CalendarPageReducerActions,
} from "./calendar.page.reducer.actions";
import {
  CalendarPageInitialStateInterface,
  CalendarPageReducerInitialState,
} from "./calendar.page.reducer.initialState";

export const calendarPageReducer: Reducer<
  CalendarPageInitialStateInterface,
  CalendarPageReducerAction
> = (
  state: CalendarPageInitialStateInterface = CalendarPageReducerInitialState,
  action: CalendarPageReducerAction,
) => {
  switch (action.type) {
    case getType(CalendarPageReducerActions.setMonth):
      return {
        ...state,
        selectedMonth: action.payload,
      };

    default:
      return state;
  }
};
