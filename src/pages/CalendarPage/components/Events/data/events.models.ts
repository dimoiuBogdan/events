export type EventType = {
  id: string;
  name: string;
  from: Date | undefined;
  to: Date | undefined;
  description?: string;
  contact?: string;
  location?: string;
};

export type NewEventType = Omit<EventType, "id">;

export type ShortEventType = Pick<EventType, "id" | "name" | "from" | "to">;
