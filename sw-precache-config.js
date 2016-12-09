module.exports = {
    root: "build",
    staticFileGlobs: [
        'build/css/**.css',
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
    }]
};