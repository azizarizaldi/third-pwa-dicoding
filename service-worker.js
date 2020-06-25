importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  workbox.core.setCacheNameDetails({
    prefix: 'premie-league'
  });
  workbox.skipWaiting();
  workbox.clientsClaim();

  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/push.js', revision: '1' },
    { url: '/register-sw.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/jquery.min.js', revision: '1' },
    { url: '/js/materialize.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/script.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
  ], {
    ignoreUrlParametersMatching: [/.*/]
  });

  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'api-football-data.org',
      cacheExpiration: {
        maxAgeSeconds: 60 * 2 // Setting kadaluarsa 2 hari
      }
    })
  );

  workbox.routing.registerRoute(
    new RegExp('https://fonts.googleapis.com/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'font-googleapis',
      cacheExpiration: {
        maxAgeSeconds: 60 * 2 // Setting kadaluarsa 2 hari
      }
    })
  );

  workbox.routing.registerRoute(
    new RegExp('https://upload.wikimedia.org/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'wikipedia',
      cacheExpiration: {
        maxAgeSeconds: 60 * 2 // Setting kadaluarsa 2 hari
      }
    })
  );

  workbox.routing.registerRoute(
    new RegExp('https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'snarkdown',
      cacheExpiration: {
        maxAgeSeconds: 60 * 2 // Setting kadaluarsa 2 hari
      }
    })
  );
  
  workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'pages'
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/js/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'js'
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/images/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'images'
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/css/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'css'
    })
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 14, // Setting kadaluarsa selama 14 hari
        }),
      ],
    })
  );

  self.addEventListener('push', function (event) {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    let options = {
      body: body,
      icon: 'images/soccer.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Premier League', options)
    );
  });
} else {
  console.log(`Workbox gagal dimuat`);
}