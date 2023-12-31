export type EventType = {
  id: string;
  name: string;
  from_date: string;
  to_date: string;
  description?: string;
  contact?: string;
  location?: string;
};

export type NewEventType = Partial<Omit<EventType, "id">>;

export type ShortEventType = Pick<
  EventType,
  "id" | "name" | "from_date" | "to_date"
>;

export type EventsLengthsType = {
  from_date: string;
  events: number;
};

export type EventEditType = Omit<EventType, "id">;
