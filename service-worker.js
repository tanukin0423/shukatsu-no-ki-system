// 就活の木 カウンセラーランチャー Service Worker
const CACHE_NAME = 'shukatsu-counselor-v1';
const URLS_TO_CACHE = [
  '/shukatsu-no-ki-system/launcher-X-1.html',
  '/shukatsu-no-ki-system/icon-192-counselor.png',
  '/shukatsu-no-ki-system/icon-512-counselor.png',
  '/shukatsu-no-ki-system/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
