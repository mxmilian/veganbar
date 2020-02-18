const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //The main app file
    entry: './src/js/index.js',
    //Where bundle
    output: {
        //Target path
        path: path.resolve(__dirname, './dist'),
        //Name of bundled file
        filename: 'js/bundle.js',
    },
    //Webpack dev server configuration
    devServer: {
      contentBase: './dist'
    },
    plugins: [
        //This plugin attach dev html to dist
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: "./src/index.html"
        })
    ]
};