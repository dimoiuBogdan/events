import EventModalActionButton from "./EventModalActionButton";

const EventModalActionButtons = () => {
  return (
    <div className="mt-6 flex items-center justify-evenly">
      <EventModalActionButton
        backgroundColor="bg-red-500"
        onClick={() => {}}
        content="Cancel"
      />
      <EventModalActionButton
        backgroundColor="bg-green-500"
        onClick={() => {}}
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
