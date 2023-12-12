import { NewEventType } from "../../data/events.models";

export const getNewEventInitialValues = (): NewEventType => {
  return {
    contact: "",
    description: "",
    from: undefined,
    location: "",
    name: "",
    to: undefined,
  };
};
