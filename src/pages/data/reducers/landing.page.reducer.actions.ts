import { ActionType, createAction } from "typesafe-actions";

const actions = {
  setData: createAction("setData", (payload: string) => payload)(),
};

export type HomepageReducerAction = ActionType<typeof actions>;
export const HomepageReducerActions = actions;
