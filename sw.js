const cacheName = 'PetHabitCache';

const htmlFiles = [
    'index.html',
    '/MobileSite/html/Account.html',
    '/MobileSite/html/Advices.html',
    '/MobileSite/html/AppSettings.html',
    '/MobileSite/html/ChooseFood.html',
    '/MobileSite/html/Diet.html',
    '/MobileSite/html/FoodInfo.html',
    '/MobileSite/html/LogIn.html',
    '/MobileSite/html/MedInfo.html',
    '/MobileSite/html/Passport.html',
    '/MobileSite/html/PersonalData.html',
    '/MobileSite/html/PetsList.html',
    '/MobileSite/html/Security.html',
    '/MobileSite/html/Settings.html'
];

const cssFiles = [
    '/MobileSite/css/style.css'
];

const jsFiles = [
    '/MobileSite/js/account.js',
    '/MobileSite/js/bottom-sheet.js',
    '/MobileSite/js/header-scroll.js',
    '/MobileSite/js/input.js',
    '/MobileSite/js/klient.js',
    '/MobileSite/js/list_advices.js',
    '/MobileSite/js/list_pets.js',
    '/MobileSite/js/logic.js',
    '/MobileSite/js/password.js',
    '/MobileSite/js/pet-share.js',
    '/MobileSite/js/table.js'
];

const fontsFiles = [
    '/MobileSite/resource/fonts/Roboto-Black.eot',
    '/MobileSite/resource/fonts/Roboto-Black.ttf',
    '/MobileSite/resource/fonts/Roboto-Black.woff',
    '/MobileSite/resource/fonts/Roboto-Black.woff2',
    '/MobileSite/resource/fonts/Roboto-Bold.eot',
    '/MobileSite/resource/fonts/Roboto-Bold.ttf',
    '/MobileSite/resource/fonts/Roboto-Bold.woff',
    '/MobileSite/resource/fonts/Roboto-Bold.woff2',
    '/MobileSite/resource/fonts/Roboto-Medium.eot',
    '/MobileSite/resource/fonts/Roboto-Medium.ttf',
    '/MobileSite/resource/fonts/Roboto-Medium.woff',
    '/MobileSite/resource/fonts/Roboto-Medium.woff2',
    '/MobileSite/resource/fonts/Roboto-Regular.eot',
    '/MobileSite/resource/fonts/Roboto-Regular.ttf',
    '/MobileSite/resource/fonts/Roboto-Regular.woff',
    '/MobileSite/resource/fonts/Roboto-Regular.woff2'
];

const imageFiles = [
    '/MobileSite/resource/advices-button.svg',
    '/MobileSite/resource/arrow.svg',
    '/MobileSite/resource/back.svg',
    '/MobileSite/resource/back-brown.svg',
    '/MobileSite/resource/back-orange.svg',
    '/MobileSite/resource/back-white.svg',
    '/MobileSite/resource/bell.svg',
    '/MobileSite/resource/birth.svg',
    '/MobileSite/resource/camera.svg',
    '/MobileSite/resource/clinic.svg',
    '/MobileSite/resource/delete-diet.svg',
    '/MobileSite/resource/delete-user.svg',
    '/MobileSite/resource/docs.svg',
    '/MobileSite/resource/dog.svg',
    '/MobileSite/resource/e-mail.svg',
    '/MobileSite/resource/edit.svg',
    '/MobileSite/resource/exit.svg',
    '/MobileSite/resource/eye-close.svg',
    '/MobileSite/resource/eye-close-brown.svg',
    '/MobileSite/resource/eye-open.svg',
    '/MobileSite/resource/eye-open-brown.svg',
    '/MobileSite/resource/filter.svg',
    '/MobileSite/resource/food.svg',
    '/MobileSite/resource/gender.svg',
    '/MobileSite/resource/human.svg',
    '/MobileSite/resource/img.png',
    '/MobileSite/resource/key.svg',
    '/MobileSite/resource/login.svg',
    '/MobileSite/resource/logo.svg',
    '/MobileSite/resource/man.svg',
    '/MobileSite/resource/medical-info.svg',
    '/MobileSite/resource/name.svg',
    '/MobileSite/resource/new-key.svg',
    '/MobileSite/resource/old-key.svg',
    '/MobileSite/resource/passport.svg',
    '/MobileSite/resource/passport-arrow.svg',
    '/MobileSite/resource/patronymic.svg',
    '/MobileSite/resource/pet-left.svg',
    '/MobileSite/resource/pet-right.svg',
    '/MobileSite/resource/phone.svg',
    '/MobileSite/resource/scales.svg',
    '/MobileSite/resource/search.svg',
    '/MobileSite/resource/settings.svg',
    '/MobileSite/resource/share.svg',
    '/MobileSite/resource/shared-access.svg',
    '/MobileSite/resource/special-food.svg',
    '/MobileSite/resource/speed-indicator-high.svg',
    '/MobileSite/resource/speed-indicator-low.svg',
    '/MobileSite/resource/speed-indicator-middle.svg',
    '/MobileSite/resource/surname.svg',
    '/MobileSite/resource/table-save.svg',
    '/MobileSite/resource/woman.svg',
    '/MobileSite/resource/И.svg',
    '/MobileSite/resource/Ф.svg'
];

const contentToCache = htmlFiles.concat(cssFiles).concat(jsFiles).concat(imageFiles).concat(fontsFiles);

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
  //e.respondWith((async () => {
  //  const r = await caches.match(e.request);
  //  console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
  //  if (r) { return r; }
  //  const response = await fetch(e.request);
  //  const cache = await caches.open(cacheName);
  //  console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
  //  cache.put(e.request, response.clone());
  //  return response;
  //})());
});