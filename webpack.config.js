const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer'); 

module.exports = {
    entry: __dirname + '/src/main.js',
    output: {
        path: __dirname,
        filename: 'assets/main.min.js'
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use:[ 'css-loader','sass-loader','postcss-loader'],
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.html$/,
                use: [ 'file-loader?name=[path][name].[ext]!extract-loader!html-loader' ]
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('assets/main.min.css'),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: false
            },
            mangle: {
                except: ['$'],
                screw_ie8 : true,
                keep_fnames: true
            }
        }),
    ]
};
