importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

workbox.core.skipWaiting()
workbox.core.clientsClaim() 
    
    
const staticCacheName = "static-v1";
const assets = [
    "../index.html",
    "https://unpkg.com/localbase/dist/localbase.min.js",
    "//cdn.jsdelivr.net/npm/faunadb@latest/dist/faunadb.js",
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.0/gsap.min.js"
]

self.addEventListener("install", (e) => { // stworzenie pliku static i przypisanie w nim plików  
     e.waitUntil(                       
        caches.open(staticCacheName).then(cache => { 
            return cache.addAll(assets); 
        }) 
    ); 
});
self.addEventListener("fetch", (e) => { // podczas ładowania plików pliki które są plikami w  assets sa zapisywane 
    e.respondWith(                       
        caches.match(e.request).then(response => { 
            return response || fetch(e.request); 
        }) 
    ); 
});




