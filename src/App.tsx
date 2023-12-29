import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./common/components/Navbar/Navbar";
import Notifications from "./common/components/Notifications.tsx/Notifications";
import { handleAxiosInterceptor } from "./common/data/helpers/axios.helper";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const queryClient = new QueryClient();

  handleAxiosInterceptor();

  return (
    <div className="text-primary min-h-screen px-2">
      <QueryClientProvider contextSharing client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <BrowserRouter basename="/">
          <Notifications />
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
};

export default App;
