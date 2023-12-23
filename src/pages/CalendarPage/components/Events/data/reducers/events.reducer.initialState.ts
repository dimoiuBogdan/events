export interface EventsInitialStateInterface {
  selectedEventId: string | undefined;
}

export const EventsReducerInitialState: Readonly<EventsInitialStateInterface> =
  {
    selectedEventId: undefined,
  };
