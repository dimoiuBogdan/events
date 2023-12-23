import { ActionType, createAction } from "typesafe-actions";
import { NotificationType } from "../models/notifications.models";

const actions = {
  addNotification: createAction(
    "addNotification",
    (payload: Omit<NotificationType, "id">) => payload,
  )(),
  removeNotification: createAction(
    "removeNotification",
    (payload: Pick<NotificationType, "id">) => payload,
  )(),
};

export type NotificationsReducerAction = ActionType<typeof actions>;
export const NotificationsReducerActions = actions;
