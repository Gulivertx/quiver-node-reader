const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const helpers = require('./helpers');
const extractSass = new ExtractTextPlugin({
    filename: 'css/[name]' + (process.env.NODE_ENV === "production" ? '.[hash]' : '') + '.css'
});

const plugins = [
    extractSass,
    // Define index HTML
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: helpers.root('app/index.html'),
        inject: 'body',
        hash: true,
    }),
    // Ignore Moment Locales
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
];

if (process.env.NODE_ENV === 'analyse') {
    plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
    entry: {
        'app': './src/index.js',
        'vendor': ['react', 'react-dom', 'react-redux', 'react-router-dom', 'redux', 'redux-thunk']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    test: 'vendor',
                    name: "vendor",
                    enforce: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.(otf|eot|ttf|woff2?)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit : 10000,
                        outputPath : 'fonts/',
                    }
                }
            },
            {
                test: /\.(css|sass|scss)$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            sourceMap: process.env.NODE_ENV !== "production"
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: process.env.NODE_ENV !== "production"
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit : 10000,
                            outputPath : 'img/',
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            optipng: {
                                progressive: true,
                                optimizationLevel: 7,
                                interlaced: false,
                            },
                            mozjpeg: {
                                quality: 65
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            svgo:{
                                plugins: [
                                    {
                                        removeViewBox: false
                                    },
                                    {
                                        removeEmptyAttrs: false
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins
};