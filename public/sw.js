self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/app.js" /* add other assets here */,
      ]);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== "my-cache") {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(handleFetch(event.request));
});

async function handleFetch(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);

    if (response && response.status === 200) {
      const cache = await caches.open("my-cache");
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    return new Response("Offline", { status: 503 });
  }
}

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "NEW_VERSION_AVAILABLE") {
    showNotification("New version available!");
  }
});

function showNotification(message) {
  self.registration.showNotification("My App", {
    body: message,
    icon: "/vite.svg",
  });
}
