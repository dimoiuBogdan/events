import { ActionType, createAction } from "typesafe-actions";

const actions = {
  setMonth: createAction("setMonth", (payload: number) => payload)(),
};

export type CalendarPageReducerAction = ActionType<typeof actions>;
export const CalendarPageReducerActions = actions;
