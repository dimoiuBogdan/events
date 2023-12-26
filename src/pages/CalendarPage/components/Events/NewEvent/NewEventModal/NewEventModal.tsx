import { Form, Formik, FormikHelpers } from "formik";
import { Dispatch, FC, SetStateAction } from "react";
import Input from "../../../../../../common/components/Form/Input";
import ModalWrapper from "../../../../../../common/components/ModalWrapper";
import { NewEventType } from "../../data/models/events.models";
import { getNewEventInitialValues } from "../data/new-event.helper";
import { newEventValidationSchema } from "../data/new-event.validation-schema";
import NewEventModalSubmit from "./NewEventModalSubmit";

type Props = {
  setShowNewEventModal: Dispatch<SetStateAction<boolean>>;
};
const NewEventModal: FC<Props> = ({ setShowNewEventModal }) => {
  const handleCloseModal = () => {
    setShowNewEventModal(false);
  };

  const handleCreateEvent = (
    values: NewEventType,
    { setSubmitting }: FormikHelpers<NewEventType>,
  ) => {
    if (!values.from_date || !values.to_date) {
      return;
    }

    setSubmitting(false);
    handleCloseModal();
  };

  return (
    <ModalWrapper handleCloseModal={handleCloseModal}>
      <Formik
        initialValues={getNewEventInitialValues()}
        onSubmit={handleCreateEvent}
        validationSchema={newEventValidationSchema}
        enableReinitialize
        validateOnChange={false}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex flex-col gap-y-2">
            <div className="mb-2 text-center text-xl">Add a new event</div>
            <Input
              id="name"
              name="name"
              label="Name"
              onChange={(value) => {
                setFieldValue("name", value);
              }}
              required
            />

            <Input
              id="from_date"
              name="from_date"
              label="From Date"
              type="datetime-local"
              onChange={(value) => {
                setFieldValue("from_date", value);
              }}
              required
            />

            <Input
              id="to_date"
              name="to_date"
              label="To Date"
              type="datetime-local"
              onChange={(value) => {
                setFieldValue("to_date", value);
              }}
              required
            />

            <Input
              id="description"
              name="description"
              label="Description"
              onChange={(value) => {
                setFieldValue("description", value);
              }}
              textarea
            />

            <Input
              id="contact"
              name="contact"
              label="Contact"
              onChange={(value) => {
                setFieldValue("contact", value);
              }}
            />

            <Input
              id="location"
              name="location"
              label="Location"
              onChange={(value) => {
                setFieldValue("location", value);
              }}
            />

            <NewEventModalSubmit
              isSubmitting={isSubmitting}
              handleCloseModal={handleCloseModal}
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default NewEventModal;
