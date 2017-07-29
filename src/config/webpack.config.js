const defaultConfig = require('@ionic/app-scripts/config/webpack.config.js');
const webpack = require('webpack');

module.exports = function() {
    const config = Object.assign({}, defaultConfig, {
        plugins: [].concat(defaultConfig.plugins, [
            new webpack.DefinePlugin({
                'process.env': {
                    PRODUCTION: JSON.stringify(process.env.IONIC_ENV !== 'dev')
                }
            })
        ])
    });

    return config;
};
