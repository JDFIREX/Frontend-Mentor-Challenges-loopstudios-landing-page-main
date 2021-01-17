importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

  workbox.routing.registerRoute( 
    /\.(?:css|js|html)$/, 
    new workbox.strategies.StaleWhileRevalidate({ 
        "cacheName" : "assets", 
        plugins : [ 
            new workbox.expiration.ExpirationPlugin({ 
                maxEntries : 30, 
                maxAgeSeconds: 1800 
            }) 
        ] 
    }) 
); 

const staticCacheName = "static-v1";
const assets = [
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



workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.precaching.precacheAndRoute([])
workbox.precaching.precacheAndRoute([{"revision":"25df1984d39ada9bbf56b63fa6fe21dc","url":"app.js"},{"revision":"edf1a5861d36383ffb6bd23fc4d800fc","url":"index.html"},{"revision":"679e2514b5b2fd5f39ebf3f79b65805b","url":"style.css"},{"revision":"4be62ac4658b100b97f81e8609edac99","url":"workbox-08ce18c6.js"},{"revision":"174133c89daf656bbb0b6e9df1b7c06a","url":"../images/desktop/image-curiosity.jpg"},{"revision":"f2f8d9cd8551b543fe982b391d04ce69","url":"../images/desktop/image-deep-earth.jpg"},{"revision":"424dcc3cba5db9b4749004ce8d58fdbd","url":"../images/desktop/image-fisheye.jpg"},{"revision":"416227692ab374b38162ac5e863a55be","url":"../images/desktop/image-from-above.jpg"},{"revision":"7f6c56ef3249af6441ed2d32eb245f59","url":"../images/desktop/image-grid.jpg"},{"revision":"6929d36d64b181395fc0a004c8e4bdca","url":"../images/desktop/image-hero.jpg"},{"revision":"a3187b1ed455f94e4922f76b1375f408","url":"../images/desktop/image-interactive.jpg"},{"revision":"c48a5bded8d255085ef14880b43381ea","url":"../images/desktop/image-night-arcade.jpg"},{"revision":"c6cb31ac7cfefc8b7ed225bf352721de","url":"../images/desktop/image-pocket-borealis.jpg"},{"revision":"0f74e30d0703966e39dd0e70b40ad47e","url":"../images/desktop/image-soccer-team.jpg"},{"revision":"e61bf23ed009745cab7fd334b1f2e5aa","url":"../images/favicon-240x240.png"},{"revision":"a07f423b8bbf4a50c2c449b96795fcb6","url":"../images/favicon-32x32.png"},{"revision":"544b7043f766140cc692765cad3275dd","url":"../images/icon-close.svg"},{"revision":"6bb27b42035b99b5afcad2502f555385","url":"../images/icon-facebook.svg"},{"revision":"aaa97e522585c5075951af8205ea91e9","url":"../images/icon-hamburger.svg"},{"revision":"f2cc3ebf3ae266c22f42791cb58eb0d7","url":"../images/icon-instagram.svg"},{"revision":"a113ee92911a283a3282049e12f625c3","url":"../images/icon-pinterest.svg"},{"revision":"eaea353fea0324812310de364e43133d","url":"../images/icon-twitter.svg"},{"revision":"3282a27c94f2287197f00708a1d299b3","url":"../images/icons/apple-icon-180.png"},{"revision":"a1af989e8331862029951e7957ce5586","url":"../images/icons/apple-splash-1125-2436.jpg"},{"revision":"8ab2facbac321c63671fb064734875aa","url":"../images/icons/apple-splash-1136-640.jpg"},{"revision":"4f159a6adb9cc11058aaa245496cfdc5","url":"../images/icons/apple-splash-1170-2532.jpg"},{"revision":"9c0793e2e72ac2863755df457338e22c","url":"../images/icons/apple-splash-1242-2208.jpg"},{"revision":"830a02dc71755188623fce87bf966e11","url":"../images/icons/apple-splash-1242-2688.jpg"},{"revision":"1dd2d275a77ff8b1238afd250687038d","url":"../images/icons/apple-splash-1284-2778.jpg"},{"revision":"cea3f54870eb601176a771c5fb3bf82c","url":"../images/icons/apple-splash-1334-750.jpg"},{"revision":"fbfa7788db56639363af35cb5887635d","url":"../images/icons/apple-splash-1536-2048.jpg"},{"revision":"4362b8c87f4dd83a7ed6850738e603fd","url":"../images/icons/apple-splash-1620-2160.jpg"},{"revision":"ff3839debeecbe36b3480579ef5e276d","url":"../images/icons/apple-splash-1668-2224.jpg"},{"revision":"9b9709db7157ea6f21c2547da9e5a74f","url":"../images/icons/apple-splash-1668-2388.jpg"},{"revision":"1d4aed559b5438f7124e5a255f1438ad","url":"../images/icons/apple-splash-1792-828.jpg"},{"revision":"7c2ef552bc5570c5393a5ed3ef8a02b6","url":"../images/icons/apple-splash-2048-1536.jpg"},{"revision":"ac0553e7976efd6996108bc9d4204473","url":"../images/icons/apple-splash-2048-2732.jpg"},{"revision":"73262a666024e042d09476fff4347e53","url":"../images/icons/apple-splash-2160-1620.jpg"},{"revision":"243cf0ef2dc7d9ada06d27af1cd670ad","url":"../images/icons/apple-splash-2208-1242.jpg"},{"revision":"5e13296202bc3db1e1b828eb0b52e42a","url":"../images/icons/apple-splash-2224-1668.jpg"},{"revision":"8559b32f9facf6ea9856b67ba0c0e635","url":"../images/icons/apple-splash-2388-1668.jpg"},{"revision":"793c0ed3a3d5e19add317b2ec98f80e4","url":"../images/icons/apple-splash-2436-1125.jpg"},{"revision":"7e533b44e5120e114ef79de4b5669a53","url":"../images/icons/apple-splash-2532-1170.jpg"},{"revision":"232c538a10d7092304fbc78b22e9627c","url":"../images/icons/apple-splash-2688-1242.jpg"},{"revision":"c6a597c6ca96df4f5533e5257a56d0eb","url":"../images/icons/apple-splash-2732-2048.jpg"},{"revision":"6c8fb0dc760a2a9f1703926cb94220da","url":"../images/icons/apple-splash-2778-1284.jpg"},{"revision":"187bc71862653c200cf24e1f7a13e595","url":"../images/icons/apple-splash-640-1136.jpg"},{"revision":"846133b95c790a2fdd1546e3a069a91d","url":"../images/icons/apple-splash-750-1334.jpg"},{"revision":"5d1c6f0d02d8154ce8fd552ac20bb840","url":"../images/icons/apple-splash-828-1792.jpg"},{"revision":"dc7753e8162b586e549e065fa02059e6","url":"../images/icons/manifest-icon-192.png"},{"revision":"a87c87d7004ae0d7f417c54ea6de951d","url":"../images/icons/manifest-icon-512.png"},{"revision":"a3a2439a5a1b54b949f870f5c1c2dc61","url":"../images/logo.svg"},{"revision":"1f03086b1ef153a5cff85a51e6aac5a1","url":"../images/mobile/image-curiosity.jpg"},{"revision":"6775b4d43b038d894cbd4797db0e2675","url":"../images/mobile/image-deep-earth.jpg"},{"revision":"0d0dd1dc7703a78e298e7fb01ae9ec05","url":"../images/mobile/image-fisheye.jpg"},{"revision":"fa84bcdf6d24289c9ad27c77a37d1c9f","url":"../images/mobile/image-from-above.jpg"},{"revision":"c35701a414eee790760ba88dc05a4c4c","url":"../images/mobile/image-grid.jpg"},{"revision":"1ccce44daf413b6c9c89afd88d68cc91","url":"../images/mobile/image-hero.jpg"},{"revision":"1fe1e2016054a23737583e8a65a52cae","url":"../images/mobile/image-interactive.jpg"},{"revision":"da1e24072d6d5af41ce3b918497893d4","url":"../images/mobile/image-night-arcade.jpg"},{"revision":"c4cb30594a6b069943aa9debe6629daa","url":"../images/mobile/image-pocket-borealis.jpg"},{"revision":"d8c478dca6a5d4b917fb53ed8b70f353","url":"../images/mobile/image-soccer-team.jpg"}]);