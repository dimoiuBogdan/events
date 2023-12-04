import { Reducer, getType } from "typesafe-actions";
import {
  LandingPageReducerAction,
  LandingPageReducerActions,
} from "./landing.page.reducer.actions";
import {
  LandingPageInitialStateInterface,
  LandingPageReducerInitialState,
} from "./landing.page.reducer.initialState";

export const landingPageReducer: Reducer<
  LandingPageInitialStateInterface,
  LandingPageReducerAction
> = (
  state: LandingPageInitialStateInterface = LandingPageReducerInitialState,
  action: LandingPageReducerAction
) => {
  switch (action.type) {
    case getType(LandingPageReducerActions.setData):
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
