const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')

    .addEntry('homepage', [
        './assets/styles/styles.css',
        './assets/styles/global.css',
        // './assets/pageScroller.js',
        './assets/bootstrap.js'
    ])

    .addEntry('company-list', [
        './assets/styles/styles.css',
        './assets/styles/global.css',
        './assets/styles/company-list.css',
        './assets/bootstrap.js',

    ])

    .addEntry('company-profile', [
        './assets/styles/styles.css',
        './assets/styles/global.css',
        './assets/styles/company-profile.css',
        './assets/bootstrap.js',
    ])

    .addEntry('terms', [
        './assets/styles/styles.css',
        './assets/styles/global.css',
        './assets/styles/terms.css',
        './assets/bootstrap.js',
    ])

    .enableStimulusBridge('./assets/controllers.json')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    // .autoProvidejQuery()

    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment if you use React
    //.enableReactPreset()

    .copyFiles([
        {
            from: './public/img',
            to: 'images/[path][name].[ext]',
        },
        {
            from: './public/fonts',
            to: 'fonts/[path][name].[ext]',
        }
    ])
;

module.exports = Encore.getWebpackConfig();
