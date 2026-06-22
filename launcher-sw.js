// ====================================
// 就活の木 管理ランチャー専用 Service Worker
// ====================================

const CACHE_NAME = 'launcher-x-v3';  // v2→v3（修正反映）

const CACHE_FILES = [
  './launcher-X.html',
  './launcher-manifest.json',
  './icon-192-counselor.png',
  './icon-512-counselor.png',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
];

// インストール
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(
        CACHE_FILES.map(url =>
          cache.add(url).catch(err =>
            console.warn('[launcher-sw] キャッシュスキップ:', url, err.message)
          )
        )
      )
    ).then(() => self.skipWaiting())
  );
});

// アクティベート
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k.startsWith('launcher-x-') && k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// フェッチ（Network First）← clone順序を修正
self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) return;
  event.respondWith(
    fetch(event.request)
      .then(res => {
        if (event.request.method === 'GET' && res.status === 200) {
          const resClone = res.clone(); // ← 先にcloneしてからキャッシュ
          caches.open(CACHE_NAME).then(c => c.put(event.request, resClone));
        }
        return res; // ← オリジナルをそのまま返す
      })
      .catch(() =>
        caches.match(event.request).then(cached =>
          cached || (event.request.destination === 'document'
            ? caches.match('./launcher-X.html')
            : new Response('オフライン中', { status: 503 }))
        )
      )
  );
});
