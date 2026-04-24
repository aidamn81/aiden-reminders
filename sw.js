self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// This listens for actual push events from a server
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'Archive Alert', body: 'Ritual Due.' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: 'icon-192.png',
      badge: 'icon-192.png'
    })
  );
});
