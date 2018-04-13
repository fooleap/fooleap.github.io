const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer'); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: __dirname + '/src/main.js',
    output: {
        path: __dirname + '/assets',
        filename: 'main.min.js'
    },
    stats: {
        entrypoints: false,
        children: false
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {loader: 'postcss-loader', options: { plugins: () => [ require('autoprefixer') ] }},
                    'sass-loader'
                ]
            },{
                test: /\.(woff|woff2)$/,
                use: [ 'file-loader?name=[name].[ext]' ]
            },{
                test: /\.html$/,
                use: [ 'file-loader?name=[path][name].[ext]!extract-loader!html-loader' ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.min.css'
        })
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
