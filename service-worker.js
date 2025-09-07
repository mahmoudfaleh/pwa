const CACHE_NAME = "pwa-cache-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("./index.html");
        }
      });
    })
  );
});

// Hook for push notifications (requires backend)
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.text() : "Default push message";
  event.waitUntil(
    self.registration.showNotification("🔔 Push Notification", {
      body: data,
      icon: "icons/icon-192.png"
    })
  );
});
