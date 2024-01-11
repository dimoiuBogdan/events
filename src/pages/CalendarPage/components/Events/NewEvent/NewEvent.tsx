import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import NewEventModal from "./NewEventModal/NewEventModal";

const NewEvent = () => {
  const [showNewEventModal, setShowNewEventModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowNewEventModal(true)}
        className="group flex cursor-pointer items-center gap-x-2 hover:text-emerald-400"
      >
        <FaPlus className="h-5 w-5 rounded-full bg-emerald-400 p-1 group-hover:text-white" />
        Add new event
      </div>
      {showNewEventModal && (
        <NewEventModal setShowNewEventModal={setShowNewEventModal} />
      )}
    </>
  );
};

export default NewEvent;
/*
 * DOCS :
 * Represents new event button
 * Holds the modal for a new event
 * Responsible for opening the modal for a new event
 */
