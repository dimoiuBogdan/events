import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import CalendarPage from "../pages/CalendarPage/Calendar.page";
import LandingPage from "../pages/LandingPage/Landing.page";
import LoginPage from "../pages/LoginPage/Login.page";
import ProfilePage from "../pages/ProfilePage/Profile.page";
import RegisterPage from "../pages/RegisterPage/Register.page";
import PrivateRouteWrapper from "./PrivateRouteWrapper";
import { AUTH_ROUTES, CALENDAR_ROUTES, PROFILE_ROUTE } from "./routes";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path={CALENDAR_ROUTES.BASE}
        element={
          <PrivateRouteWrapper>
            <CalendarPage />
          </PrivateRouteWrapper>
        }
      />
      <Route
        path={PROFILE_ROUTE}
        element={
          <PrivateRouteWrapper>
            <ProfilePage />
          </PrivateRouteWrapper>
        }
      />
      <Route path={AUTH_ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={AUTH_ROUTES.LOGIN} element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
