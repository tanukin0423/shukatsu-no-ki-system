// ====================================
// 就活の木 管理ランチャー専用 Service Worker
// ※ shukatsu-no-ki-system の既存SWとは独立したキャッシュ名を使用
// ====================================

const CACHE_NAME = 'launcher-x-v1';  // ← 既存SWのキャッシュ名と衝突しない固有名

const CACHE_FILES = [
  './launcher-X.html',
  './launcher-manifest.json',
  './icon-192-counselor.png',
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

// アクティベート（古いキャッシュは自分のプレフィックスのみ削除）
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

// フェッチ（Network First）
self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith('http')) return;
  event.respondWith(
    fetch(event.request)
      .then(res => {
        if (event.request.method === 'GET' && res.status === 200) {
          caches.open(CACHE_NAME).then(c => c.put(event.request, res.clone()));
        }
        return res;
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
