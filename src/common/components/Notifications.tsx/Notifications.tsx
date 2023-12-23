import { useAppSelector } from "../../../redux/hooks";
import Notification from "./Notification";

const Notifications = () => {
  const notifications = useAppSelector(
    (state) => state.notificationsReducer.notifications,
  );

  return (
    <>
      {notifications.map((notification, index) => {
        const { id, title, message, type } = notification;

        return (
          <Notification
            id={id}
            index={index}
            key={id}
            message={message}
            title={title}
            type={type}
          />
        );
      })}
    </>
  );
};

export default Notifications;
