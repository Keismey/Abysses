// Abysses — service worker. Changer VERSION à chaque mise en ligne.
const VERSION = 'abysses-1.0.1';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './en.html', './manifest-en.webmanifest',
  './a/0989dc3753eb.webp',
  './a/1069aa76976e.webp',
  './a/16e17ef3d920.webp',
  './a/18950f994430.webp',
  './a/189874e4fc6e.webp',
  './a/19b0beeead1d.webp',
  './a/1f297a8886dc.webp',
  './a/21af9157ee4e.webp',
  './a/289e387dee98.webp',
  './a/29942f1687d4.webp',
  './a/29f1fc3882d6.webp',
  './a/2a7af79d9672.webp',
  './a/327b46c5b666.webp',
  './a/351238debbf7.webp',
  './a/35222d3fe857.webp',
  './a/35945ead04e7.webp',
  './a/382f1ad18414.webp',
  './a/3c568f283598.webp',
  './a/3ef5ac4fa971.webp',
  './a/3fa3a8b11d28.webp',
  './a/3ffe766f60f8.webp',
  './a/40632a302982.webp',
  './a/4303390dd241.webp',
  './a/44728c4cf605.webp',
  './a/4477e117409c.webp',
  './a/4536fc4760fb.webp',
  './a/45712119959e.webp',
  './a/465f6b6f90df.webp',
  './a/4753e9586985.webp',
  './a/4906fac1396c.webp',
  './a/4b5ebde88ea5.webp',
  './a/5057b66b4d1c.webp',
  './a/5106fc3f095c.webp',
  './a/57c71bef1fcc.webp',
  './a/5ac450e0d5f4.webp',
  './a/5dc1693f14af.webp',
  './a/5faea8e143fc.webp',
  './a/68507326904e.webp',
  './a/69928c2339b3.webp',
  './a/6dd722d01fc4.webp',
  './a/6e6176323789.webp',
  './a/6f9e97424a5a.webp',
  './a/7345a6447e6e.webp',
  './a/73d4cad86f8c.webp',
  './a/74d0fda808ee.webp',
  './a/75e83e3367e3.webp',
  './a/7663f49b2292.webp',
  './a/778b19f55a17.mp3',
  './a/7799cf0da344.webp',
  './a/7e10e1491933.webp',
  './a/85fe90fcfc17.webp',
  './a/8a0767bf1e02.webp',
  './a/8a707142c4a2.webp',
  './a/8c3352aac56d.webp',
  './a/8f8afa4d7b17.webp',
  './a/91c39d52f0bc.webp',
  './a/999228f3e929.webp',
  './a/9ca837225fec.webp',
  './a/9edf9f89b19c.webp',
  './a/9f6519e8a861.webp',
  './a/a63dc030b7ff.webp',
  './a/a8ab7155e8a0.webp',
  './a/ab7871658c2c.webp',
  './a/abef7548957e.webp',
  './a/ad55f8f5b650.webp',
  './a/b220296e03d8.webp',
  './a/bb0fbc6a1362.webp',
  './a/bc96f776f782.webp',
  './a/bd597c75a6e4.webp',
  './a/be3aa05c3ed1.webp',
  './a/be4a896fa231.webp',
  './a/bf6d3f7488f2.webp',
  './a/c4ab9793eb10.webp',
  './a/c70db4fd492c.webp',
  './a/c7f6b49e8337.webp',
  './a/c91eb1aedba1.mp3',
  './a/c97372f98cf0.webp',
  './a/d47fd7c78867.webp',
  './a/d4daa1fff933.webp',
  './a/d5c90f0e3a66.webp',
  './a/d73cbcabf711.webp',
  './a/d77f040d6d25.webp',
  './a/db048d6619e6.webp',
  './a/db86e726cb2e.webp',
  './a/de8101d32684.webp',
  './a/e01a7e0d4513.webp',
  './a/e20564e28b89.webp',
  './a/e24ea90878ae.webp',
  './a/e305754f6a9e.webp',
  './a/e312ff54fc9d.webp',
  './a/e4bbd141b581.webp',
  './a/e56ce9573e41.webp',
  './a/eaef8adde2a6.webp',
  './a/edc45c336968.webp',
  './a/ef603b05faa5.webp',
  './a/f1a51f9980a7.webp',
  './a/f39a64f42206.webp',
  './a/f43165051c18.webp',
  './a/f4a6f819c9ee.webp',
  './a/f82edb445935.webp'];
const FONTS = 'abysses-fonts';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONTS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => { if (e.data === 'skip') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit ||
      fetch(req).then(r => {
        if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return r;
      }).catch(() => req.mode === 'navigate' ? caches.match('./index.html') : undefined)
    )
  );
});
