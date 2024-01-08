import { NewEventType } from "../../data/models/events.models";

export const getNewEventInitialValues = (from_date?: string): NewEventType => {
  return {
    contact: "",
    description: "",
    from_date: from_date || undefined,
    location: "",
    name: "",
    to_date: undefined,
  };
};
