import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/Landing.page";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default AppRoutes;
