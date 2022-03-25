var GH_PATH = "/m-spaces";
var APP_PREFIX = "spaces";

var VERSION = "v1.3";

var URLS = [
  `${GH_PATH}`,
  `${GH_PATH}/index.html`,
  `${GH_PATH}/forum.html`,
  `${GH_PATH}/main.css`,
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css",
  "https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js",
  "https://account.snatchbot.me/script.js",
  "https://www.readingeagle.com/wp-content/uploads/2022/01/LIFE-SELF-MENTALHEALTH-TIPS-DMT.jpg?w=1024",
  "https://feyton.co.rw/static/images/testimonials-2-men-talking.svg",
  "https://feyton.co.rw/static/images/details-1-office-worker.svg",
  "https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;800&display=swap",
  "https://res.cloudinary.com/feyton/image/upload/v1643272521/user_nophzu.png",
];

var CACHE_NAME = APP_PREFIX + VERSION;
self.addEventListener("fetch", function (e) {
  console.log("Fetch request sent: ", e.request.url);
  e.respondWith(
    caches
      .match(e.request)
      .then(function (request) {
        if (request) {
          console.log("Responding with cache: ", e.request.url);
          return request;
        } else {
          console.log("File is not cached: ", e.request.url);
          return fetch(e.request);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  );
});

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Installing caches: ", CACHE_NAME);
      return cache.addAll(URLS);
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(
        keyList.map(function (key, i) {
          console.log("Deleting cache: ", keyList[i]);
          return caches.delete(keyList[i]);
        })
      );
    })
  );
});
