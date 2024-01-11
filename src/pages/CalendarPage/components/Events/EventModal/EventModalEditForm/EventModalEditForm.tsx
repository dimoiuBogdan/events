import { Form, Formik } from "formik";
import Input from "../../../../../../common/components/Form/Input";
import useEventsApi from "../../data/hooks/useEvents.api";
import EventModalEditFormActionButtons from "./EventModalEditFormActionButtons";
import { getEventModalEditFormInitialValues } from "./data/helpers/event-modal-edit-form.helper";
import { eventModalEditFormValidationSchema } from "./data/helpers/event-modal-edit-form.validation-schema";

const EventModalEditForm = () => {
  const { selectedEvent, updateEventRequest } = useEventsApi();

  if (!selectedEvent) return <></>;

  return (
    <Formik
      enableReinitialize
      validationSchema={eventModalEditFormValidationSchema}
      initialValues={getEventModalEditFormInitialValues(selectedEvent)}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        updateEventRequest.mutate(values, {
          onSuccess: () => {
            resetForm();
          },
          onSettled: () => {
            setSubmitting(false);
          },
        });
      }}
    >
      {({ isSubmitting, setFieldValue, dirty }) => (
        <Form className="flex flex-col gap-y-6">
          <Input
            id="name"
            label="Name"
            name="name"
            onChange={(value) => {
              setFieldValue("name", value);
            }}
            required
          />
          <Input
            id="from_date"
            label="From date"
            name="from_date"
            type="datetime-local"
            onChange={(value) => {
              setFieldValue("from_date", value);
            }}
            required
          />
          <Input
            id="to_date"
            label="To date"
            name="to_date"
            type="datetime-local"
            onChange={(value) => {
              setFieldValue("to_date", value);
            }}
            required
          />
          <Input
            id="description"
            label="Description"
            name="description"
            onChange={(value) => {
              setFieldValue("description", value);
            }}
          />
          <Input
            id="contact"
            label="Contact"
            name="contact"
            onChange={(value) => {
              setFieldValue("contact", value);
            }}
          />
          <Input
            id="location"
            label="Location"
            name="location"
            onChange={(value) => {
              setFieldValue("location", value);
            }}
          />
          <EventModalEditFormActionButtons
            isSubmitting={isSubmitting}
            dirty={dirty}
          />
        </Form>
      )}
    </Formik>
  );
};

export default EventModalEditForm;
/*
 * DOCS :
 * Represents the form for editing a specific event inside the modal
 * Reponsible for editing event related informations
 */
