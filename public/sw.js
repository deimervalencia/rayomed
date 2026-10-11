const CACHE = 'rayomed-discovery-v1.1'
const ASSETS = ['./', './index.html', './app.js', './styles.css', './questions.json', './favicon.svg', './manifest.webmanifest']
self.addEventListener('install', (evt) => evt.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())))
self.addEventListener('activate', (evt) => evt.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('rayomed-discovery-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())))
self.addEventListener('fetch', (evt) => {
  if (evt.request.method !== 'GET' || new URL(evt.request.url).origin !== self.location.origin) return
  evt.respondWith(fetch(evt.request).then(response => { if (response.ok) { const copy=response.clone(); caches.open(CACHE).then(c=>c.put(evt.request,copy)) } return response }).catch(()=>caches.match(evt.request)))
})
