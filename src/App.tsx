import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./common/components/Navbar/Navbar";
import Notifications from "./common/components/Notifications.tsx/Notifications";
import { handleAxiosInterceptor } from "./common/data/helpers/axios.helper";
import { store } from "./redux/store";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 10000,
        staleTime: 10000,
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  handleAxiosInterceptor();

  return (
    <div className="text-primary min-h-screen px-2">
      <ReduxProvider store={store}>
        <PrimeReactProvider>
          <QueryClientProvider contextSharing client={queryClient}>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <BrowserRouter basename="/">
              <Notifications />
              <Navbar />
              <AppRoutes />
            </BrowserRouter>
          </QueryClientProvider>
        </PrimeReactProvider>
      </ReduxProvider>
    </div>
  );
};

export default App;
/*
 * DOCS :
 * Represents the main app file
 * Holds the app routes
 * Holds the app providers
 * Responsible app-wide initializations
 */
