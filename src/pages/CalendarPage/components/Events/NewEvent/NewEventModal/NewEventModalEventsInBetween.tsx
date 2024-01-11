import { SelectItemOptionsType } from "primereact/selectitem";
import { FC } from "react";

type Props = {
  eventsInBetween: SelectItemOptionsType;
};
const NewEventModalEventsInBetween: FC<Props> = ({ eventsInBetween }) => {
  if (!eventsInBetween.length) return <></>;

  return (
    <div className="text-sm">
      <div className="mb-1 text-zinc-100">
        Events between these dates ( {eventsInBetween.length} )
      </div>
      <div className="flex max-h-16 flex-col gap-y-0.5 overflow-y-auto text-zinc-300">
        {eventsInBetween.map((event) => (
          <div key={event.value}>{event.label}</div>
        ))}
      </div>
    </div>
  );
};

export default NewEventModalEventsInBetween;
/*
 * DOCS :
 * Represents the list of events that are in between the new event dates
 */
