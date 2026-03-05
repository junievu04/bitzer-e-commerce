/* Minimal service worker placeholder.
 * If you later enable Firebase Cloud Messaging, replace this file
 * with Firebase Messaging SW setup (importScripts + messaging handlers).
 */

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Optional: allow manual skip-waiting from the page
self.addEventListener("message", (event) => {
  if (event?.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// No-op push handler to avoid runtime errors if a stale registration exists.
self.addEventListener("push", () => {
  // Intentionally empty
});

