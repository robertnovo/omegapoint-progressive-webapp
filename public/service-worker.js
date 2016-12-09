'use strict';

function initialiseState() {
	if (Notification.permission !== 'granted') {
		console.log('The user has not granted the notification permission.');
		return;
	} else if (Notification.permission === "blocked") {
		/* the user has previously denied push. Can't reprompt. */
	} else {
		/* show a prompt to the user */
	}

	// Use serviceWorker.ready so this is only invoked
	// when the service worker is available.
	navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
		serviceWorkerRegistration.pushManager.getSubscription()
			.then(function (subscription) {
				if (!subscription) {
					// Set appropriate app states.
					return;
				}
			})
			.catch(function (err) {
				console.log('Error during getSubscription()', err);
			});
	});
}

if (Notification) {
	initialiseState();
}

// Incrementing CACHE_VERSION will kick off the install event and force previously cached
// resources to be cached again.
	const CACHE_VERSION = 1;
let CURRENT_CACHES = {
	offline: 'offline-v' + CACHE_VERSION
};
const OFFLINE_URL = 'offline.html';

function createCacheBustedRequest(url) {
	let request = new Request(url, { cache: 'reload' });
	// See https://fetch.spec.whatwg.org/#concept-request-mode
	// This is not yet supported in Chrome as of M48, so we need to explicitly check to see
	// if the cache: 'reload' option had any effect.
	if ('cache' in request) {
		return request;
	}

	// If {cache: 'reload'} didn't have any effect, append a cache-busting URL parameter instead.
	let bustedUrl = new URL(url, self.location.href);
	bustedUrl.search += (bustedUrl.search ? '&' : '') + 'cachebust=' + process.hrtime();
	return new Request(bustedUrl);
}

self.addEventListener('install', event => {
	event.waitUntil(
		// We can't use cache.add() here, since we want OFFLINE_URL to be the cache key, but
		// the actual URL we end up requesting might include a cache-busting parameter.
		fetch(createCacheBustedRequest(OFFLINE_URL)).then(function (response) {
			return caches.open(CURRENT_CACHES.offline).then(function (cache) {
				return cache.put(OFFLINE_URL, response);
			});
		})
	);
});

self.addEventListener('activate', event => {
	// Delete all caches that aren't named in CURRENT_CACHES.
	// While there is only one cache in this example, the same logic will handle the case where
	// there are multiple versioned caches.
	let expectedCacheNames = Object.keys(CURRENT_CACHES).map(function (key) {
		return CURRENT_CACHES[key];
	});

	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cacheName => {
					if (expectedCacheNames.indexOf(cacheName) === -1) {
						// If this cache name isn't present in the array of "expected" cache names,
						// then delete it.
						console.log('Deleting out of date cache:', cacheName);
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', event => {
	// We only want to call event.respondWith() if this is a navigation request
	// for an HTML page.
	// request.mode of 'navigate' is unfortunately not supported in Chrome
	// versions older than 49, so we need to include a less precise fallback,
	// which checks for a GET request with an Accept: text/html header.
	if (event.request.mode === 'navigate' ||
		(event.request.method === 'GET' &&
		event.request.headers.get('accept').includes('text/html'))) {
		console.log('Handling fetch event for', event.request.url);
		event.respondWith(
			fetch(event.request).catch(error => {
				// The catch is only triggered if fetch() throws an exception, which will most likely
				// happen due to the server being unreachable.
				// If fetch() returns a valid HTTP response with an response code in the 4xx or 5xx
				// range, the catch() will NOT be called. If you need custom handling for 4xx or 5xx
				// errors, see https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/fallback-response
				console.log('Fetch failed; returning offline page instead.', error);
				return caches.match(OFFLINE_URL);
			})
		);
	}

	// If our if() condition is false, then this fetch handler won't intercept the request.
	// If there are any other fetch handlers registered, they will get a chance to call
	// event.respondWith(). If no fetch handlers call event.respondWith(), the request will be
	// handled by the browser as if there were no service worker involvement.
});

self.addEventListener('push', function (event) {
	console.log('Received a push message', event);

	var title = 'Yay a message.';
	var body = 'We have received a push message.';
	var icon = '/images/icon-192x192.png';
	var tag = 'simple-push-demo-notification-tag';

	event.waitUntil(
		self.registration.showNotification(title, {
			body: body,
			icon: icon,
			tag: tag
		})
	);
});

self.addEventListener('notificationclick', function (event) {
	console.log('On notification click: ', event.notification.tag);
	// Android doesn’t close the notification when you click on it
	// See: http://crbug.com/463146
	event.notification.close();

	// This looks to see if the current is already open and
	// focuses if it is
	event.waitUntil(clients.matchAll({
		type: 'window'
	}).then(function (clientList) {
		for (var i = 0; i < clientList.length; i++) {
			var client = clientList[i];
			if (client.url === '/' && 'focus' in client) {
				return client.focus();
			}
		}
		if (clients.openWindow) {
			return clients.openWindow('/');
		}
	}));
});
