import dayjs from "dayjs";
import { Form, Formik, FormikHelpers } from "formik";
import { SelectItemOptionsType } from "primereact/selectitem";
import { Dispatch, FC, SetStateAction, useState } from "react";
import Input from "../../../../../../common/components/Form/Input";
import ModalWrapper from "../../../../../../common/components/ModalWrapper";
import useCalendar from "../../../../data/hooks/useCalendar";
import useEventsApi from "../../data/hooks/useEvents.api";
import { NewEventType } from "../../data/models/events.models";
import { getNewEventInitialValues } from "../data/new-event.helper";
import { newEventValidationSchema } from "../data/new-event.validation-schema";
import NewEventModalEventsInBetween from "./NewEventModalEventsInBetween";
import NewEventModalSubmit from "./NewEventModalSubmit";

type Props = {
  setShowNewEventModal: Dispatch<SetStateAction<boolean>>;
};
const NewEventModal: FC<Props> = ({ setShowNewEventModal }) => {
  const { formatDate, selectedDate } = useCalendar();
  const { addEventRequest, eventsLengths } = useEventsApi();

  const [eventsInBetween, setEventsInBetween] = useState<SelectItemOptionsType>(
    [],
  );

  const parsedInitialFromDate = formatDate(
    new Date(selectedDate.year, selectedDate.month, selectedDate.day),
    "YYYY-MM-DDTHH:mm",
  );

  const handleCloseModal = () => {
    setShowNewEventModal(false);
  };

  const handleCreateEvent = (
    values: NewEventType,
    { setSubmitting }: FormikHelpers<NewEventType>,
  ) => {
    addEventRequest.mutate(values, {
      onSettled: () => {
        setSubmitting(false);
      },
      onSuccess: () => {
        setShowNewEventModal(false);
      },
    });
  };

  const getEventsBetweenDates = (
    from_date: string | undefined,
    to_date: string | undefined,
  ) => {
    if (!from_date) return [];

    const formattedFromDate = formatDate(
      new Date(from_date),
      "YYYY-MM-DDTHH:mm",
    );
    const formattedToDate = to_date
      ? formatDate(new Date(to_date), "YYYY-MM-DDTHH:mm")
      : undefined;

    if (!eventsLengths) return [];

    const eventsInBetween = eventsLengths.filter((event) => {
      const eventFromDate = formatDate(
        new Date(event.from_date),
        "YYYY-MM-DDTHH:mm",
      );
      const eventToDate = formatDate(
        new Date(event.to_date),
        "YYYY-MM-DDTHH:mm",
      );

      const newEventEndsAfter =
        dayjs(eventToDate).isAfter(formattedFromDate) ||
        dayjs(eventToDate).isSame(formattedFromDate);

      const newEventStartsBefore =
        dayjs(eventFromDate).isBefore(formattedToDate) ||
        dayjs(eventFromDate).isSame(formattedToDate);

      if (typeof formattedToDate === "undefined")
        return (
          dayjs(eventFromDate).isAfter(formattedFromDate) &&
          dayjs(eventFromDate).isSame(formattedFromDate)
        );

      return newEventEndsAfter && newEventStartsBefore;
    });

    const mappedEvents: SelectItemOptionsType = eventsInBetween.map(
      (event) => ({
        label: `${event.name} - ${formatDate(
          new Date(event.from_date),
          "DD/MM HH:mm",
        )} => ${formatDate(new Date(event.to_date), "DD/MM HH:mm")}`,
        value: event.id,
      }),
    );

    setEventsInBetween(mappedEvents);
  };

  return (
    <ModalWrapper handleCloseModal={handleCloseModal}>
      <Formik
        initialValues={getNewEventInitialValues(parsedInitialFromDate)}
        onSubmit={handleCreateEvent}
        validationSchema={newEventValidationSchema}
        enableReinitialize
        validateOnChange={false}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="flex flex-col gap-y-1">
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
              label="From date"
              type="datetime-local"
              onChange={(value) => {
                getEventsBetweenDates(value, values.to_date);

                setFieldValue("from_date", value);
              }}
              required
            />

            <Input
              id="to_date"
              name="to_date"
              label="To date"
              type="datetime-local"
              onChange={(value) => {
                getEventsBetweenDates(values.from_date, value);

                setFieldValue("to_date", value);
              }}
              disabled={!dayjs(values.from_date).isValid()}
            />

            <NewEventModalEventsInBetween eventsInBetween={eventsInBetween} />

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
              isLoading={addEventRequest.isLoading}
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
/*
 * DOCS :
 * Represents the modal for adding a new event
 * Holds the form for adding a new event
 * Responsible for displaying the existing events that are in between the new event dates
 * Responsible for submitting the creation of a new event
 */
