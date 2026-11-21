const CACHE = 'edubridge-bbn-v5';

const ASSETS = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './manifest.json',
    './assets/logo.svg',
    './assets/homepage.jpg'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key =>
                    key.startsWith('edubridge-bbn-') &&
                    key !== CACHE
                ).map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.open(CACHE).then(cache =>
            cache.match(e.request).then(r =>
                r || fetch(e.request)
            )
        )
    );
});
