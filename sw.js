const CACHE_NAME = 'petcaixa-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,600;0,900;1,300&family=DM+Sans:wght@300;400;500&display=swap'
];

// Instalação — pré-cacheia assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS.map(url => new Request(url, { mode: 'no-cors' })));
    })
  );
  self.skipWaiting();
});

// Ativação — remove caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch — Cache First para assets, Network First para resto
self.addEventListener('fetch', event => {
  const { request } = event;

  // Ignora requisições não-GET
  if (request.method !== 'GET') return;

  // Fontes do Google: cache first
  if (request.url.includes('fonts.googleapis.com') || request.url.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // Arquivos locais: cache first, fallback network
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback
        if (request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

// Background Sync — salva dados pendentes quando voltar online
self.addEventListener('sync', event => {
  if (event.tag === 'sync-petcaixa') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Placeholder para futura integração com backend
  console.log('[PetCaixa SW] Sync executado');
}
