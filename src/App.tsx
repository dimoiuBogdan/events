import { BrowserRouter } from "react-router-dom";
import Notifications from "./common/components/Notifications.tsx/Notifications";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="text-primary min-h-screen px-2">
      <BrowserRouter basename="/">
        <Notifications />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
