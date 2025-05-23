const CACHE_NAME = 'auth-pwa-cache-v1';
const urlsToCache = [
  '/PWA/',
  '/PWA/index.html',
  '/PWA/style.css',
  '/PWA/script.js',
  '/PWA/manifest.json',
  '/PWA/icons/icon-192.png',
  '/PWA/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
