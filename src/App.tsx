import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import Notifications from "./common/components/Notifications.tsx/Notifications";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className="text-primary min-h-screen px-2">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/">
          <Notifications />
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
