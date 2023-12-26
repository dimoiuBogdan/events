import { FC } from "react";
import EventModalActionButton from "./EventModalActionButton";

type Props = {
  handleCloseModal: () => void;
  handleNotify: () => void;
};
const EventModalActionButtons: FC<Props> = ({
  handleCloseModal,
  handleNotify,
}) => {
  return (
    <div className="mt-6 flex items-center justify-evenly">
      <EventModalActionButton
        backgroundColor="bg-red-500"
        onClick={handleCloseModal}
        content="Cancel"
      />
      <EventModalActionButton
        backgroundColor="bg-green-500"
        onClick={handleNotify}
        content="Notify"
      />
      <EventModalActionButton
        backgroundColor="bg-blue-500"
        onClick={() => {}}
        content="Edit"
      />
    </div>
  );
};

export default EventModalActionButtons;
