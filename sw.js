let archiveData = [];
let sentNotifs = new Set();

self.addEventListener('message', (event) => {
  if (event.data.type === 'SYNC') {
    archiveData = event.data.data;
  }
});

// The Sentinel Loop
function monitor() {
  const now = new Date();
  const timestamp = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);

  archiveData.forEach(item => {
    if (item.time === timestamp && !sentNotifs.has(item.id)) {
      self.registration.showNotification("Gothic Archive", {
        body: item.text,
        icon: 'icon-192.png',
        tag: item.id, // Critical for iOS group tracking
        renotify: true
      });
      sentNotifs.add(item.id);
    }
  });
}

// Check every 20 seconds
setInterval(monitor, 20000);

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));
