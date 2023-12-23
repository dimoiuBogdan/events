import { combineReducers } from "@reduxjs/toolkit";
import { StateType } from "typesafe-actions";
import { eventsReducer } from "../pages/CalendarPage/components/Events/data/reducers/events.reducer";
import { landingPageReducer } from "../pages/LandingPage/data/reducers/landing.page.reducer";
import { notificationsReducer } from "./../common/components/Notifications.tsx/data/reducers/notifications.reducer";
import { calendarPageReducer } from "./../pages/CalendarPage/data/reducers/calendar.page.reducer";

const reducers = {
  landingPageReducer,
  calendarPageReducer,
  eventsReducer,
  notificationsReducer,
};

export const rootReducer = combineReducers(reducers);
export type RootState = StateType<typeof rootReducer>;
