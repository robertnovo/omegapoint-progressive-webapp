// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
	'messagingSenderId': '342261881423'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.requestPermission()
	.then(function () {
		console.log('Notification permission granted.');
		// TODO(developer): Retrieve an Instance ID token for use with FCM.
		// ...
	})
	.catch(function (err) {
		console.log('Unable to get permission to notify.', err);
	});

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken()
	.then(function (currentToken) {
		if (currentToken) {
			sendTokenToServer(currentToken);
			updateUIForPushEnabled(currentToken);
		} else {
			// Show permission request.
			console.log('No Instance ID token available. Request permission to generate one.');
			// Show permission UI.
			updateUIForPushPermissionRequired();
			setTokenSentToServer(false);
		}
	})
	.catch(function (err) {
		console.log('An error occurred while retrieving token. ', err);
		showToken('Error retrieving Instance ID token. ', err);
		setTokenSentToServer(false);
	});

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function () {
	messaging.getToken()
		.then(function (refreshedToken) {
			console.log('Token refreshed.');
			// Indicate that the new Instance ID token has not yet been sent to the
			// app server.
			setTokenSentToServer(false);
			// Send Instance ID token to app server.
			sendTokenToServer(refreshedToken);
			// ...
		})
		.catch(function (err) {
			console.log('Unable to retrieve refreshed token ', err);
			showToken('Unable to retrieve refreshed token ', err);
		});
});


messaging.setBackgroundMessageHandler(function (payload) {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	// Customize notification here
	const notificationTitle = 'Background Message Title';
	const notificationOptions = {
		body: 'Background Message body.',
		icon: '/firebase-logo.png'
	};

	return self.registration.showNotification(notificationTitle,
		notificationOptions);
});
