/**
 * Development stub loaded by OneSignalSDKWorker.js via importScripts('./sw.js').
 * Production builds emit the real Workbox service worker from
 * src/cash/shared/swConfig.tsx (InjectManifest → sw.js) and replace this file.
 */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
