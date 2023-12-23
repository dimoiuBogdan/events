import { Reducer, getType } from "typesafe-actions";
import { v4 } from "uuid";
import { NotificationType } from "../models/notifications.models";
import {
  NotificationsReducerAction,
  NotificationsReducerActions,
} from "./notifications.reducer.actions";
import {
  NotificationsInitialStateInterface,
  NotificationsReducerInitialState,
} from "./notifications.reducer.initialState";

export const notificationsReducer: Reducer<
  NotificationsInitialStateInterface,
  NotificationsReducerAction
> = (
  state: NotificationsInitialStateInterface = NotificationsReducerInitialState,
  action: NotificationsReducerAction,
) => {
  switch (action.type) {
    case getType(NotificationsReducerActions.addNotification): {
      const newNotification: NotificationType = {
        id: v4(),
        ...action.payload,
      };

      return {
        ...state,
        notifications: [...state.notifications, newNotification],
      };
    }
    case getType(NotificationsReducerActions.removeNotification): {
      const filteredNotifications = state.notifications.filter(
        (notification) => notification.id !== action.payload.id,
      );

      return {
        ...state,
        notifications: filteredNotifications,
      };
    }

    default:
      return state;
  }
};
