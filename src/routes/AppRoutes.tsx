import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import CalendarPage from "../pages/CalendarPage/Calendar.page";
import LandingPage from "../pages/LandingPage/Landing.page";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  );
};

export default AppRoutes;
