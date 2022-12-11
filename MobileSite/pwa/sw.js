const cacheName = 'PetHabitCache';
const appShellFiles = [
  'index.html'
];

const htmlPages =[]
const htmlFolder = '/MobileSite/html/';
const fs = require('fs');

fs.readdir(htmlFolder, (err, files) => {
  i = 0;
  files.forEach(file => {
    htmlPages[i] = file;
    i = i + 1;
  });
});

const contentToCache = appShellFiles.concat(htmlPages);

const cssPages =[]
const cssFolder = '/MobileSite/css/';
fs.readdir(cssFolder, (err, files) => {
  i = 0;
  files.forEach(file => {
    cssPages[i] = file;
    i = i + 1;
  });
});

const contentToCache = contentToCache.concat(cssPages);



// Установка (инициализация кэша)
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

// Активация
self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});