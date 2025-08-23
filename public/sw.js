// Service Worker for MDB Website - Advanced Caching
const CACHE_NAME = 'mdb-website-v1.0.0';
const STATIC_CACHE = 'mdb-static-v1.0.0';
const IMAGE_CACHE = 'mdb-images-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/about',
  '/apply',
  '/contact',
  '/projects',
  '/training-program',
  '/favicon.svg',
  '/manifest.json'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_FILES);
    })
  );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.method === 'GET') {
    // Images - cache aggressively
    if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)) {
      event.respondWith(cacheFirst(request, IMAGE_CACHE));
      return;
    }
    
    // Static assets - cache aggressively
    if (url.pathname.match(/\.(css|js|woff|woff2|ttf|eot)$/i)) {
      event.respondWith(cacheFirst(request, STATIC_CACHE));
      return;
    }
    
    // HTML pages - network first, fallback to cache
    if (request.headers.get('accept')?.includes('text/html')) {
      event.respondWith(networkFirst(request, STATIC_CACHE));
      return;
    }
  }
});

// Cache first strategy - for static assets
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('Network error', { status: 408 });
  }
}

// Network first strategy - for HTML pages
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Offline', { status: 503 });
  }
}

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE && cacheName !== IMAGE_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
