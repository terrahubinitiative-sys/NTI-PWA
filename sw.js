const CACHE_NAME = 'nti-pwa-v3';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './icons/nti-logo.jpg',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './public/ezra.jpg',
    './public/brian.jpg',
    './public/Sarah.jpg'
];

// Install Event: Cache all essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache and storing NTI assets...');
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event: Serve from cache first, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response; // Return cached version if found
            }
            return fetch(event.request).catch(() => {
                // If offline and requesting a page, return cached index.html
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
