const version = "1.0.0";
const CACHE_NAME = `kodeist-${version}`;
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "/favicon.ico",
        "/index.html",
        "/polyfills.js",
        "assets/images/**",
        "assets/fonts/**",
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/simplebar/dist/simplebar.js",
        "node_modules/slick-carousel/slick/slick.min.js",
      ])
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', function (event) {

  var cacheWhitelist = [CACHE_NAME]; // TODO

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

/*self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    );
});*/

