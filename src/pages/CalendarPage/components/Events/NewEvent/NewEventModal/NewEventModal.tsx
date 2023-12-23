import { Form, Formik, FormikHelpers } from "formik";
import { Dispatch, FC, SetStateAction } from "react";
import Input from "../../../../../../common/components/Form/Input";
import ModalWrapper from "../../../../../../common/components/ModalWrapper";
import { EVENTS } from "../../../../../../common/data/constants";
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
    if (!values.from || !values.to) {
      return;
    }

    EVENTS.push({
      name: values.name,
      description: values.description,
      contact: values.contact,
      location: values.location,
      from: new Date(values.from),
      to: new Date(values.to),
      id: Math.random().toString(),
    });

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
              id="from"
              name="from"
              label="From"
              type="datetime-local"
              onChange={(value) => {
                setFieldValue("from", value);
              }}
              required
            />

            <Input
              id="to"
              name="to"
              label="To"
              type="datetime-local"
              onChange={(value) => {
                setFieldValue("to", value);
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
