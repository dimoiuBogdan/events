import { NotificationType } from "../models/notifications.models";

export interface NotificationsInitialStateInterface {
  notifications: NotificationType[];
}

export const NotificationsReducerInitialState: Readonly<NotificationsInitialStateInterface> =
  {
    notifications: [],
  };
