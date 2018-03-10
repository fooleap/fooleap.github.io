const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer'); 
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: __dirname + '/src/main.js',
    output: {
        path: __dirname + '/assets',
        filename: 'main.min.js'
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use:[
                        'css-loader',
                        'sass-loader',
                        {loader: 'postcss-loader', options: { plugins: () => [ require('autoprefixer') ] }}
                    ],
                    fallback: 'style-loader'
                }),
            },
            {
                test: /\.html$/,
                use: [ 'file-loader?name=[path][name].[ext]!extract-loader!html-loader' ]
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('main.min.css'),
    ],
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: { 
                    warnings: false,
                    output: {
                        comments: false,
                        beautify: false,
                    },
                    ie8: false
                }
            })
        ]
    }
};
