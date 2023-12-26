console.log('Service Worker running')
const CACHE_NAME = 'ngn/apl-v1';
const urlsToCache = [
    '../icons/apl-logo.png',
    '../web/index.html',
    '../web/Apl385.woff',         // font
    '../web/index.js',
    '../web/lb.js',
    '../apl.js',
    '../t.js',
    '../t.apl'
];

async function addToCache() {
    let cache = await caches.open(CACHE_NAME);
    console.log('Opened cache');
    return cache.addAll(urlsToCache);
}

self.addEventListener('install', function(event) {
    console.log('Install - Add required urls to cache')
    event.waitUntil(addToCache());
});

// Function acts as proxy - any network request goes through this function
async function fetchEvent(event) {
    let cacheResponse = await caches.match(event.request);
    console.log('Cache hit', event.request.url)
    if (cacheResponse) {
        return cacheResponse;
    }
    console.log('Cache missed', event.request.url)

    // IMPORTANT: Clone the request. A request is a stream and
    // can only be consumed once. Since we are consuming this
    // once by cache and once by the browser for fetch, we need
    // to clone the response.
    let fetchRequest = event.request.clone();

    let response = await fetch(fetchRequest);
    // Check if we received a valid response
    if(!response || response.status !== 200 || response.type !== 'basic') {
        console.log('Invalid response', event.request.url, response);
        return response;
    }

    // IMPORTANT: Clone the response. A response is a stream
    // and because we want the browser to consume the response
    // as well as the cache consuming the response, we need
    // to clone it so we have two streams.
    let responseToCache = response.clone();

    let cache = await caches.open(CACHE_NAME);
    cache.put(event.request, responseToCache);
    console.log('Put in cache', event.request.url);
    return response;     
}

self.addEventListener('fetch', function(event) {
    event.respondWith(fetchEvent(event));
});
