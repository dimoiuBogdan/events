import { NewEventType } from "../../data/models/events.models";

export const getNewEventInitialValues = (): Partial<NewEventType> => {
  return {
    contact: "",
    description: "",
    from_date: undefined,
    location: "",
    name: "",
    to_date: undefined,
  };
};
