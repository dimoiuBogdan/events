import { NotificationType } from "../models/notifications.models";

export interface NotificationsInitialStateInterface {
  notifications: NotificationType[];
}

export const NotificationsReducerInitialState: Readonly<NotificationsInitialStateInterface> =
  {
    notifications: [
      {
        id: "Info",
        title: "Info",
        message: "Info",
        type: "info",
      },
      {
        id: "error",
        title: "error",
        message: "error",
        type: "error",
      },
      {
        id: "success",
        title: "success",
        message: "success",
        type: "success",
      },
      {
        id: "warning",
        title: "warning",
        message: "warning",
        type: "warning",
      },
    ],
  };
