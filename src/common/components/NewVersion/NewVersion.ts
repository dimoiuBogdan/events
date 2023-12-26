const sw = self;

// @ts-expect-error will work on later
sw.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
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
