const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
    output: {
        path: helpers.root('app/'),
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    plugins: [
        //new webpack.NoEmitOnErrorsPlugin(),
        //yanew webpack.optimization.minimize(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(ENV)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false
            }
        })
    ]
});
