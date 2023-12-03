import { Reducer, getType } from "typesafe-actions";
import {
  HomepageReducerAction,
  HomepageReducerActions,
} from "./landing.page.reducer.actions";
import {
  HomepageInitialStateInterface,
  HomepageReducerInitialState,
} from "./landing.page.reducer.initialState";

export const homepageReducer: Reducer<
  HomepageInitialStateInterface,
  HomepageReducerAction
> = (
  state: HomepageInitialStateInterface = HomepageReducerInitialState,
  action: HomepageReducerAction
) => {
  switch (action.type) {
    case getType(HomepageReducerActions.setData):
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
