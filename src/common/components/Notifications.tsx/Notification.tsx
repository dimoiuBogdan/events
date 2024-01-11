import { HttpStatusCode } from "axios";
import { FC, useCallback, useEffect } from "react";
import {
  FaBiohazard,
  FaCandyCane,
  FaCheck,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import { useAppDispatch } from "../../../redux/hooks";
import { cn } from "../../data/helpers/helpers";
import { NotificationType } from "./data/models/notifications.models";
import { NotificationsReducerActions } from "./data/reducers/notifications.reducer.actions";

type Props = {
  index: number;
} & NotificationType;
const Notification: FC<Props> = ({
  id,
  index,
  message,
  title,
  type,
  status,
}) => {
  const dispatch = useAppDispatch();

  const TIMEOUT_MS = 5000;
  const NOTIFICATION_HEIGHT = 64;
  const MARGIN = 30;
  const TOP = index * (NOTIFICATION_HEIGHT + MARGIN) + MARGIN;

  const rateLimitStatus = status === HttpStatusCode.TooManyRequests;
  title = rateLimitStatus ? "Too many requests" : title;
  message = rateLimitStatus ? "Try again later" : message;

  const getNotificationProperties = () => {
    switch (type) {
      case "info":
        return {
          background: "bg-indigo-200",
          text: "text-indigo-800",
          icon: <FaInfoCircle />,
        };
      case "error":
        return {
          background: "bg-red-300",
          text: "text-red-800",
          icon: <FaBiohazard />,
        };
      case "success":
        return {
          background: "bg-green-300",
          text: "text-green-700",
          icon: <FaCheck />,
        };
      case "warning":
        return {
          background: "bg-amber-200",
          text: "text-amber-800",
          icon: <FaExclamationTriangle />,
        };
    }
  };

  const handleClose = useCallback(() => {
    dispatch(NotificationsReducerActions.removeNotification({ id }));
  }, [dispatch, id]);

  const handleCloseNotification = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    handleClose();
  };

  const handleRemoveNotification = useCallback(() => {
    setTimeout(() => {
      handleClose();
    }, TIMEOUT_MS);
  }, [handleClose]);

  useEffect(() => {
    handleRemoveNotification();
  }, [handleRemoveNotification]);

  return (
    <div
      className={cn(
        "fixed right-4 z-40 min-w-[300px] cursor-pointer rounded-md bg-opacity-90 px-3 py-2 shadow-md hover:scale-105",
        getNotificationProperties().background,
        getNotificationProperties().text,
      )}
      style={{ top: `${TOP}px` }}
    >
      <div
        className="absolute right-2 top-2 cursor-pointer"
        onClick={handleCloseNotification}
      >
        <FaCandyCane />
      </div>

      <div className="flex items-center gap-x-1">
        {getNotificationProperties().icon}
        <div className="text-lg font-medium first-letter:uppercase">
          {title}
        </div>
      </div>
      <div>{message}</div>
    </div>
  );
};

export default Notification;
/*
 * DOCS :
 * Represents the general notification popup
 * Responsible for styling and displaying the correct information
 */
