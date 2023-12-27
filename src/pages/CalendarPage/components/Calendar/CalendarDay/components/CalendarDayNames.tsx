import { getShortWeekDaysNames } from "../../../../data/helpers/calendar.page.helper";

const CalendarDayNames = () => {
  const weekDaysNames = getShortWeekDaysNames();

  return (
    <div className="mb-1 grid grid-cols-7 gap-2 text-center font-semibold">
      {weekDaysNames.map((day) => (
        <div key={day} className="w-8">
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarDayNames;
