import { ActionType, createAction } from "typesafe-actions";

const actions = {
  setData: createAction("setData", (payload: string) => payload)(),
};

export type LandingPageReducerAction = ActionType<typeof actions>;
export const LandingPageReducerActions = actions;
