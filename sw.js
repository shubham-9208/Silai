if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let c={};const f=e=>s(e,d),o={module:{uri:d},exports:c,require:f};i[d]=Promise.all(n.map((e=>o[e]||f(e)))).then((e=>(r(...e),c)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-DOD0sSne.js",revision:null},{url:"assets/index-FC3YhmtS.css",revision:null},{url:"index.html",revision:"0de98fed3d6c1c4fd141797ad3fc1e00"},{url:"registerSW.js",revision:"d61c1f2b8341edf5adb14101b96512f7"},{url:"favicon.ico",revision:"99e8cdffd1326ae62d4661baf797ea70"},{url:"apple-touch-icon.png",revision:"7fd287793b8ef5d618372f58153138cd"},{url:"pwa-192x192.png",revision:"6d21be7e2fcb581ca677fd3d6469c374"},{url:"pwa-512x512.png",revision:"1dc5d6f5fd438a7ae12df685c4a2670a"},{url:"pwa-maskable-192x192.png",revision:"9bf78c19c4074cf1b6d35c029ab255da"},{url:"pwa-maskable-512x512.png",revision:"6521ec690e1b71379944361f034a1702"},{url:"manifest.webmanifest",revision:"42b215a8abc5fe991326f35b1b92645d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
