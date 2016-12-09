module.exports = {
    root: "build",
    staticFileGlobs: [
        'build/css/**.css',
        'build/**/*.html',
        'build/img/**.*',
        'build/static/**/*'
    ],
    navigateFallback: "offline.html"
};