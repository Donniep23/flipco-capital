const CACHE_NAME = 'flipco-capital-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/dashboard',
  '/login',
  '/register',
  '/about',
  '/projects',
  '/blog',
  '/manifest.json',
  // Add critical CSS and JS files
  '/_next/static/css/app.css',
  '/_next/static/chunks/main.js'
];

const DYNAMIC_CACHE_URLS = [
  '/api/contact',
  '/api/projects',
  '/api/notifications'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Error caching static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      networkFirst(request)
    );
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('/dashboard')
        .then((response) => {
          return response || fetch(request);
        })
        .catch(() => {
          return caches.match('/');
        })
    );
    return;
  }

  // Handle static assets with cache-first strategy
  event.respondWith(
    cacheFirst(request)
  );
});

// Cache-first strategy
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache-first strategy failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network-first strategy for API calls
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache for:', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response(
      JSON.stringify({ error: 'Offline - Please check your connection' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Push notification event
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);

  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const options = {
    title: data.title || 'Flipco Capital Update',
    body: data.body || 'You have a new project update',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    image: data.image,
    data: {
      url: data.url || '/dashboard',
      projectId: data.projectId,
      timestamp: Date.now()
    },
    actions: [
      {
        action: 'view',
        title: 'View Details',
        icon: '/icons/view-icon.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/dismiss-icon.png'
      }
    ],
    tag: data.tag || 'general',
    renotify: true,
    requireInteraction: data.urgent || false,
    silent: false,
    vibrate: [200, 100, 200],
    timestamp: Date.now()
  };

  event.waitUntil(
    self.registration.showNotification(options.title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);

  event.notification.close();

  const { action, data } = event;
  let url = data?.url || '/dashboard';

  if (action === 'view') {
    if (data?.projectId) {
      url = `/dashboard?project=${data.projectId}`;
    }
  } else if (action === 'dismiss') {
    return; // Just close the notification
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url.includes(url.split('?')[0]) && 'focus' in client) {
            return client.focus();
          }
        }

        // Open new window if app is not open
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);

  if (event.tag === 'project-update') {
    event.waitUntil(syncProjectUpdates());
  } else if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForms());
  }
});

async function syncProjectUpdates() {
  try {
    // Sync any pending project updates when back online
    const response = await fetch('/api/projects/sync');
    if (response.ok) {
      console.log('Project updates synced successfully');
    }
  } catch (error) {
    console.error('Error syncing project updates:', error);
  }
}

async function syncContactForms() {
  try {
    // Sync any pending contact form submissions when back online
    const response = await fetch('/api/contact/sync');
    if (response.ok) {
      console.log('Contact forms synced successfully');
    }
  } catch (error) {
    console.error('Error syncing contact forms:', error);
  }
}

// Periodic background sync for project updates
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'project-updates') {
    event.waitUntil(
      fetchLatestProjectUpdates()
    );
  }
});

async function fetchLatestProjectUpdates() {
  try {
    const response = await fetch('/api/projects/latest');
    if (response.ok) {
      const updates = await response.json();

      // Send notifications for any urgent updates
      updates.forEach((update) => {
        if (update.urgent) {
          self.registration.showNotification('Urgent Project Update', {
            body: update.message,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/badge-72x72.png',
            data: {
              url: `/dashboard?project=${update.projectId}`,
              projectId: update.projectId
            },
            tag: `project-${update.projectId}`,
            requireInteraction: true
          });
        }
      });
    }
  } catch (error) {
    console.error('Error fetching project updates:', error);
  }
}

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  console.log('Message received in service worker:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});
