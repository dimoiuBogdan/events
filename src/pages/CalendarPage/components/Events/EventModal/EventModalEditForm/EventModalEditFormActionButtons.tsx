import { FC } from "react";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { EventsReducerActions } from "../../data/reducers/events.reducer.actions";
import EventModalActionButton from "../EventModalActionButtons/EventModalActionButton";

type Props = {
  dirty: boolean;
  isSubmitting: boolean;
};
const EventModalEditFormActionButtons: FC<Props> = ({
  isSubmitting,
  dirty,
}) => {
  const dispatch = useAppDispatch();

  const saveButtonTooltipMessage = isSubmitting
    ? "Saving changes..."
    : !dirty
      ? "No changas made"
      : "Save";

  return (
    <div className="flex items-center justify-center gap-x-8">
      <EventModalActionButton
        backgroundColor="bg-green-500"
        onClick={() => {}}
        content="Save"
        disabled={isSubmitting || !dirty}
        tooltipMessage={saveButtonTooltipMessage}
      />
      <EventModalActionButton
        backgroundColor="bg-red-500"
        onClick={() => dispatch(EventsReducerActions.setEditEventMode(false))}
        content="Cancel"
      />
    </div>
  );
};

export default EventModalEditFormActionButtons;
/*
 * DOCS :
 * Represents the submitting / canceling section for editing event modal
 * Reponsible for finishing the editing process
 */
