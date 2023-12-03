import { combineReducers } from "@reduxjs/toolkit";
import { StateType } from "typesafe-actions";
import { homepageReducer } from "../pages/data/reducers/landing.page.reducer";
import { HomepageReducerAction } from "../pages/data/reducers/landing.page.reducer.actions";

const reducers = {
  homepageReducer,
};

export const rootReducer = combineReducers(reducers);
export type RootState = StateType<typeof rootReducer>;
export type RootAction = HomepageReducerAction;
