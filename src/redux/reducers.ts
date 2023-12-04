import { combineReducers } from "@reduxjs/toolkit";
import { StateType } from "typesafe-actions";
import { LandingPageReducerAction } from "../pages/data/reducers/landing.page.reducer.actions";
import { landingPageReducer } from "./../pages/data/reducers/landing.page.reducer";

const reducers = {
  landingPageReducer,
};

export const rootReducer = combineReducers(reducers);
export type RootState = StateType<typeof rootReducer>;
export type RootAction = LandingPageReducerAction;
