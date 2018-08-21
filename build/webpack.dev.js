const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    //devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',

    output: {
        path: helpers.root('app/'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
