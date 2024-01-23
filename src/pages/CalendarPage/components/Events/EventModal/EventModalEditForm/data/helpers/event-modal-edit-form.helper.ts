import dayjs from "dayjs";
import {
  EventEditType,
  EventType,
} from "../../../../data/models/events.models";

export const getEventModalEditFormInitialValues = (
  selectedEventData: EventType,
): EventEditType => {
  return {
    name: selectedEventData.name,
    from_date: dayjs(selectedEventData.from_date).format("YYYY-MM-DD HH:mm"),
    to_date: selectedEventData.to_date
      ? dayjs(selectedEventData.to_date).format("YYYY-MM-DD HH:mm")
      : undefined,
    description: selectedEventData.description,
    contact: selectedEventData.contact,
    location: selectedEventData.location,
  };
};
