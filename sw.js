// ═══ GfredAnalyzer — service worker (usage hors ligne) ═══════════════════
// v0.5.2 (bug trouvé par Fred : le téléphone restait bloqué sur une vieille
// version) :
//  • la PAGE (index.html) est prise sur le réseau d'abord, sans le cache HTTP
//    du navigateur → une mise à jour se voit dès la 1re ouverture ; sans
//    réseau (ou réseau qui ne répond pas en 4 s) → la copie gardée ;
//  • les autres fichiers (icônes, manifest) : copie d'abord, mise à jour en
//    tâche de fond ;
//  • à l'installation, tout est téléchargé en contournant le cache HTTP
//    (cache:'reload') : une nouvelle version ne recopie plus une vieille page.
// Ajout d'un fichier ou nouvelle version : changer CACHE_NAME.
const CACHE_NAME = 'gfredanalyzer-0.5.2';
const PRECACHE_URLS = [
  './', 'index.html', 'manifest.json', 'favicon.ico',
  'icon-180.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-192.png', 'icon-maskable-512.png'
];
const NET_TIMEOUT_MS = 4000;
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME)
    .then((c) => c.addAll(PRECACHE_URLS.map((u) => new Request(u, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys()
    .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
    .then(() => self.clients.claim()));
});
function isPage(req, url){
  return req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');
}
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;   // Web Bluetooth ne passe jamais par ici
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (isPage(req, url)) {
    // réseau d'abord (sans cache HTTP), copie si hors ligne ou trop lent
    const net = fetch(req, { cache: 'no-store' }).then((resp) => {
      if (resp && resp.status === 200) { const copy = resp.clone(); caches.open(CACHE_NAME).then((c) => c.put('index.html', copy)); }
      return resp;
    });
    const timeout = new Promise((res) => setTimeout(res, NET_TIMEOUT_MS));
    event.respondWith(Promise.race([net.catch(() => null), timeout]).then((resp) =>
      resp || caches.match('index.html').then((c) => c || net)));
    return;
  }
  event.respondWith(caches.match(req).then((cached) => {
    const net = fetch(req).then((resp) => {
      if (resp && resp.status === 200) { const copy = resp.clone(); caches.open(CACHE_NAME).then((c) => c.put(req, copy)); }
      return resp;
    }).catch(() => cached);
    return cached || net;
  }));
});
