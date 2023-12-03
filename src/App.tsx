import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="min-h-screen px-2 text-primary">
      <BrowserRouter basename="/">
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
