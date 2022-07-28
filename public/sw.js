let cacheData='appV1';
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([     
                'http://localhost:4000/blog/top-blogs',
                'http://localhost:4000/user/top-users',
            ])
        })
    )
})

// this.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request).then((res) => {
//             if(res) 
//             {
//                 console.log(res)
//             }
//         })
//     )
// })

this.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request.url)
    .catch(err => {
        caches.match(event.request).then((res) => {
            if(res) 
            {
                console.log(res)
            }
        })
    }))
})