// ═══ GfredAnalyzer — service worker (usage hors ligne) ═══════════════════
// Même stratégie que GfredDream : cache d'abord (démarrage instantané, même
// sans réseau), mise à jour en tâche de fond quand le réseau répond.
// Ajout d'un fichier ou nouvelle version : changer CACHE_NAME.
const CACHE_NAME = 'gfredanalyzer-0.3.1';
const PRECACHE_URLS = [
  './', 'index.html', 'manifest.json', 'favicon.ico',
  'icon-180.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-192.png', 'icon-maskable-512.png'
];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(PRECACHE_URLS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys()
    .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;   // Web Bluetooth ne passe jamais par ici
  event.respondWith(caches.match(event.request).then((cached) => {
    const net = fetch(event.request).then((resp) => {
      if (resp && resp.status === 200) { const copy = resp.clone(); caches.open(CACHE_NAME).then((c) => c.put(event.request, copy)); }
      return resp;
    }).catch(() => cached || caches.match('index.html'));
    return cached || net;
  }));
});
