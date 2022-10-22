self.addEventListener('install',function(event){
    console.log('SW installed');
    event.waitUntil();
    caches.open('static')
    .then(function(cache){
        cache.addAll([
            '/',
            '/app.js',
            '/css/style.css',
            '/css/tintas.css',
            '/css/sprays.css'
        ])

    });   
});

self.addEventListener('active',function(){
    console.log('SW active');    
});