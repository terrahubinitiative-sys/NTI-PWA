const CACHE_NAME = 'ezrelyn-gateway-v2';
const assets = ['/', '/index.html', '/manifest.json', '/icon-192.png', '/icon-512.png', '/ezra.jpg', '/brian.jpg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(assets)));
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((cached) => cached || fetch(e.request)));
});
