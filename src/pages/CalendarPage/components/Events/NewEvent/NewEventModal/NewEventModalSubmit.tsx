import { FC } from "react";
import Loading from "../../../../../../common/components/Loading";

type Props = {
  isLoading: boolean;
  isSubmitting: boolean;
  handleCloseModal: () => void;
};
const NewEventModalSubmit: FC<Props> = ({
  isLoading,
  isSubmitting,
  handleCloseModal,
}) => {
  return (
    <div className="mt-2 flex items-center justify-center gap-x-4">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-emerald-500 px-2 py-1 shadow-sm hover:bg-emerald-600"
          >
            Submit
          </button>
          <div
            onClick={handleCloseModal}
            className="cursor-pointer rounded-md bg-zinc-600 px-2 py-1 shadow-sm hover:bg-zinc-700"
          >
            Cancel
          </div>
        </>
      )}
    </div>
  );
};

export default NewEventModalSubmit;
/*
 * DOCS :
 * Represents submit section for adding a new event modal
 * Holds the form for adding a new event
 * Responsible for displaying the existing events that are in between the new event dates
 * Responsible for submitting the creation of a new event
 */
