/* Build-time template. Only public shell resources are cached; no user records. */
const CACHE = "career-compass-shell-8854703a29b8bae1";
const URLS = ["/","/legacy","/manifest.webmanifest","/icons/icon-192.png","/icons/icon-512.png","/icons/maskable-512.png","/_next/static/chunks/4bd1b696-92152b0f5947070d.js","/_next/static/chunks/571-9415851b333eba28.js","/_next/static/chunks/72-748dc49d40497fef.js","/_next/static/chunks/794-d1a40dcf24d651d9.js","/_next/static/chunks/899.5ce6b3cbad015b59.js","/_next/static/chunks/966.1775eb621d8d3e09.js","/_next/static/chunks/app/layout-e57ab37b53d00ddd.js","/_next/static/chunks/app/legacy/page-f43170f6f3b02536.js","/_next/static/chunks/app/manifest.webmanifest/route-94ba12960ff1a4ca.js","/_next/static/chunks/app/page-01e631c037a55841.js","/_next/static/chunks/app/_global-error/page-94ba12960ff1a4ca.js","/_next/static/chunks/app/_not-found/page-c51aa96fe873ba94.js","/_next/static/chunks/framework-6860ebc283a60d07.js","/_next/static/chunks/main-app-984aad6941d60b43.js","/_next/static/chunks/main-b2c41dbd6b546d56.js","/_next/static/chunks/next/dist/client/components/builtin/app-error-94ba12960ff1a4ca.js","/_next/static/chunks/next/dist/client/components/builtin/forbidden-94ba12960ff1a4ca.js","/_next/static/chunks/next/dist/client/components/builtin/global-error-86c58fafcefa3d6e.js","/_next/static/chunks/next/dist/client/components/builtin/not-found-94ba12960ff1a4ca.js","/_next/static/chunks/next/dist/client/components/builtin/unauthorized-94ba12960ff1a4ca.js","/_next/static/chunks/polyfills-42372ed130431b0a.js","/_next/static/chunks/webpack-f9b15ff903f2017e.js","/_next/static/css/b848cf9b4c968f1f.css","/_next/static/css/f46a068a0bcc4024.css","/_next/static/media/vazirmatn-arabic-400-normal.f37c0063.woff2","/_next/static/media/vazirmatn-arabic-600-normal.cbafd650.woff2","/_next/static/media/vazirmatn-arabic-700-normal.774fc7c6.woff2","/_next/static/media/vazirmatn-latin-400-normal.344759ea.woff2","/_next/static/media/vazirmatn-latin-600-normal.164d1b98.woff2","/_next/static/media/vazirmatn-latin-700-normal.05267f27.woff2","/_next/static/media/vazirmatn-latin-ext-400-normal.09ac364e.woff2","/_next/static/media/vazirmatn-latin-ext-600-normal.f0e62be7.woff2","/_next/static/media/vazirmatn-latin-ext-700-normal.6a92243b.woff2","/_next/static/yZRJ-c3grFSlDvVDwhgnm/_buildManifest.js","/_next/static/yZRJ-c3grFSlDvVDwhgnm/_ssgManifest.js"];
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
