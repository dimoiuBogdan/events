import { NewEventType } from "../../data/models/events.models";

export const getNewEventInitialValues = (): Partial<NewEventType> => {
  return {
    contact: "",
    description: "",
    from: undefined,
    location: "",
    name: "",
    to: undefined,
  };
};
