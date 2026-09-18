/* Build-time template. Only public shell resources are cached; no user records. */
const CACHE = __CACHE__;
const URLS = __URLS__;
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(URLS)));
  // Updates wait until all old tabs close. Never force reload an unsaved editor.
});
self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    for(const key of await caches.keys())if(key.startsWith('career-compass-shell-')&&key!==CACHE)await caches.delete(key);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==self.location.origin)return;
  if(event.request.mode==='navigate'&&(url.pathname==='/'||url.pathname==='/legacy')){
    event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(url.pathname))||fetch(event.request)));
  }else if(URLS.includes(url.pathname)){
    event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(url.pathname))||fetch(event.request)));
  }
});
