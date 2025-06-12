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

self.addEventListener('push', function(event) {
  const data = event.data?.json() || {
    title: 'Nowe powiadomienie',
    body: 'Masz nową wiadomość!',
  };

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/PWA/icons/icon-192.png', // lub inna Twoja ikona
    badge: '/PWA/icons/icon-192.png'
  });
});
