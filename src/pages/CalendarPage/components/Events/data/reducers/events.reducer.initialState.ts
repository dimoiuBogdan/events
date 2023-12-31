import { EventsLengthsType } from "../models/events.models";

export interface EventsInitialStateInterface {
  selectedEventId: string | undefined;
  eventsLengths: EventsLengthsType[];
  editEventMode: boolean;
}

export const EventsReducerInitialState: Readonly<EventsInitialStateInterface> =
  {
    selectedEventId: undefined,
    eventsLengths: [],
    editEventMode: false,
  };
