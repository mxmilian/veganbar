const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //The main app file
    entry: ['./src/js/index.js'],
    //Where bundle
    output: {
        //Target path
        path: path.resolve(__dirname, './dist'),
        //Name of bundled file
        filename: 'js/bundle.js',
    },
    //Webpack dev server configuration
    devServer: {
        contentBase: './dist',
        port: 9927,
    },
    plugins: [
        //This plugin attach dev html to dist
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: "./src/index.html"
        })
    ],
    //setup a babel
    module: {
        rules: [
            {
                //searching all files that end with.js
                test: /\.js$/,
                //excluding a searching with node_modules folder
                exclude: /node_modules/,
                //if test is passed then apply the babel-loader loader
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    }
};