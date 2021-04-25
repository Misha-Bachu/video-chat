const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './client/js/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'static/js/')
    },
    resolve: {
        fallback: { util: false }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        })
    ]
};
