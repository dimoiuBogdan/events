import { ActionType, createAction } from "typesafe-actions";
import { CalendarDateType } from "../calendar.page.models";

const actions = {
  setSelectedDate: createAction(
    "setSelectedDate",
    (payload: Partial<CalendarDateType>) => payload,
  )(),
};

export type CalendarPageReducerAction = ActionType<typeof actions>;
export const CalendarPageReducerActions = actions;
