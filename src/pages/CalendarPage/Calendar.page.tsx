import Calendar from "./components/Calendar/Calendar";
import Events from "./components/Events/Events";

const CalendarPage = () => {
  return (
    <div className="flex w-fit flex-col gap-y-6">
      <Calendar />
      <Events />
    </div>
  );
};

export default CalendarPage;
