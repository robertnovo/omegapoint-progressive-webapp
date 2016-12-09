module.exports = {
    root: "build",
    staticFileGlobs: [
        'build/**/*.html',
        'build/img/**.*',
        'build/static/**/*'
    ],
    navigateFallback: "offline.html",
    runtimeCaching: [{
        // See https://github.com/GoogleChrome/sw-toolbox#methods
        urlPattern: /images/,
        handler: 'cacheFirst',
        // See https://github.com/GoogleChrome/sw-toolbox#options
        options: {
            cache: {
                maxEntries: 1,
                name: 'images-cache'
            }
        }
    }],
    importScripts: ["service-worker-push.js"]
};