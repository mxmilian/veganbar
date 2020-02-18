const path = require('path');

module.exports = {
    //The main app file
    entry: './src/js/index.js',
    //Where bundle
    output: {
        //Target path
        path: path.resolve(__dirname, './dist/js'),
        //Name of bundled file
        filename: 'bundle.js',
    }
};