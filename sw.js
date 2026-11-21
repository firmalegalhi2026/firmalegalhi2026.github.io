// Solo guarda el logo y la página de entrada. Los datos del cliente NUNCA se guardan en el teléfono.
var CACHE = 'hi-entrada-v2';
var ARCHIVOS = ['./', 'index.html', 'portal.html', 'logo.jpg','manifest.webmanifest', 'icono-192.png', 'icono-512.png', 'apple-touch-icon.png', 'favicon.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARCHIVOS); })); self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (k) { return Promise.all(k.filter(function (n) { return n !== CACHE; }).map(function (n) { return caches.delete(n); })); }));
  self.clients.claim();
});
self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return; // Google (la carpeta) va siempre directo, sin guardar nada
  e.respondWith(fetch(e.request).catch(function () { return caches.match(e.request); }));
});
