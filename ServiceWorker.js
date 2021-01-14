const staticCacheName = "site-static-v1";
const dynamicCache = "site-dynamic-v1";
const assets = [
    "/",
    "/index.html",
    "/src/app.js",
    "/src/style.css",
    "/images/desktop/image-curiosity.jpg",
    "/images/desktop/image-deep-earth.jpg",
    "/images/desktop/image-fisheye.jpg",
    "/images/desktop/image-from-above.jpg",
    "/images/desktop/image-grid.jpg",
    "/images/desktop/image-hero.jpg",
    "/images/desktop/image-interactive.jpg",
    "/images/desktop/image-night-arcade.jpg",
    "/images/desktop/image-pocket-borealis.jpg",
    "/images/desktop/image-soccer-team.jpg",
    "/images/mobile/image-curiosity.jpg",
    "/images/mobile/image-deep-earth.jpg",
    "/images/mobile/image-fisheye.jpg",
    "/images/mobile/image-from-above.jpg",
    "/images/mobile/image-grid.jpg",
    "/images/mobile/image-hero.jpg",
    "/images/mobile/image-interactive.jpg",
    "/images/mobile/image-night-arcade.jpg",
    "/images/mobile/image-pocket-borealis.jpg",
    "/images/mobile/image-soccer-team.jpg",
    "/images/favicon-32x32.png",
    "/images/icon-facebook.svg",
    "/images/icon-hamburger.svg",
    "/images/icon-instagram.svg",
    "/images/icon-pinterest.svg",
    "/images/icon-twitter.svg",
    "/images/icon-close.svg",
    "/images/icons/manifest-icon-192.png",
    "/images/logo.svg",
    "/manifest.json",
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.0/gsap.min.js"
];
let l = "";
self.addEventListener("install", (e) => {
    l = e.target.location.origin
    e.waitUntil(                      
        caches.open(staticCacheName).then((cache) => {
            return cache.addAll(assets)
        }) 
    )
})

self.addEventListener("active", (e) => {
    e.waitUntil(
        caches.keys().then( keys => {
            return Promise.all(keys
                .filter(k => k != staticCacheName)
                .map(k => caches.delete(k) )
            );
        })
    );
})

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then(response  => {
            return response || fetch(e.request).then( fetchRes => {  // dynamic fetch reszta zapytań które nie są przypisywne do pliki static są sprawdzane i po załadowaniu są  dodawane do dynamicznego folderu cache
                return caches.open(dynamicCache).then(cache => {   
                    cache.put(e.request.url, fetchRes.clone());
                    return fetchRes;       
                }) 
            }); 
        })
    );
});
self.addEventListener('install', () => self.skipWaiting());  
self.addEventListener('activate', () => self.clients.claim());
