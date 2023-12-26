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
  </StrictMode>,
);

const sw = self;

// @ts-expect-error will work on later
sw.register({
  // @ts-expect-error will work on later
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      // @ts-expect-error will work on later
      waitingServiceWorker.addEventListener("statechange", (event) => {
        if (event.target.state === "activated") {
          if (
            window.confirm(
              "There is a new version of the app ready. Please reload to update.",
            )
          ) {
            window.location.reload();
          }
        }
      });
      waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
    }
  },
});
