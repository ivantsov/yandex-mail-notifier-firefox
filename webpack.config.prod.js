const webpack = require('webpack');
const config = require('./webpack.config.dev');

module.exports = Object.assign({}, config, {
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
        // uncomment it when UglifyJS will be released

        /* new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            compress: {
                warnings: false
            }
        }) */
    ]
});