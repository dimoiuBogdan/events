import { NewEventType } from "../../data/models/events.models";

export const getNewEventInitialValues = (from_date?: string): NewEventType => {
  return {
    contact: "",
    description: "",
    from_date,
    location: "",
    name: "",
    to_date: undefined,
  };
};
