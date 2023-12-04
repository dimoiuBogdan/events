import { combineReducers } from "@reduxjs/toolkit";
import { StateType } from "typesafe-actions";
import { CalendarPageReducerAction } from "../pages/CalendarPage/data/reducers/calendar.page.reducer.actions";
import { landingPageReducer } from "../pages/LandingPage/data/reducers/landing.page.reducer";
import { LandingPageReducerAction } from "../pages/LandingPage/data/reducers/landing.page.reducer.actions";
import { calendarPageReducer } from "./../pages/CalendarPage/data/reducers/calendar.page.reducer";

const reducers = {
  landingPageReducer,
  calendarPageReducer,
};

export const rootReducer = combineReducers(reducers);
export type RootState = StateType<typeof rootReducer>;
export type RootAction = LandingPageReducerAction | CalendarPageReducerAction;
