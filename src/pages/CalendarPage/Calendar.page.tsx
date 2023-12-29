import useAuthApi from "../../common/components/Auth/data/hooks/useAuth.api";
import Calendar from "./components/Calendar/Calendar";
import Events from "./components/Events/Events";

const CalendarPage = () => {
  const { logoutUserRequest } = useAuthApi();

  const handleLogout = () => {
    logoutUserRequest.mutate();
  };

  return (
    <div className="flex w-fit flex-col gap-y-6">
      <div
        onClick={handleLogout}
        className="w-fit cursor-pointer rounded-md bg-indigo-500 p-2 text-2xl shadow-md hover:bg-indigo-600"
      >
        Logout
      </div>
      <Calendar />
      <Events />
    </div>
  );
};

export default CalendarPage;
