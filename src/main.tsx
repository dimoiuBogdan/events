import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "./index.css";

import { PrimeReactProvider } from "primereact/api";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App.tsx";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </ReduxProvider>
  </StrictMode>
);
