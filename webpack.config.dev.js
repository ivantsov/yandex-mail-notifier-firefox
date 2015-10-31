module.exports = {
    entry: './src/panel/index.js',
    output: {
        path: './data/panel',
        filename: 'index.js'
    },
    resolve: {
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }]
    }
};
