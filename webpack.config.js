let webpack = require('webpack');
let path = require('path');

let BUILD_DIR = path.resolve(__dirname, './public/js');
let APP_DIR = path.resolve(__dirname, '.');

let config = {
    entry: APP_DIR + "/react/index.jsx",
    output: {
        path: BUILD_DIR,
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ["es2015", "react", "stage-0"]
                }
            }]
        }]
    },
    resolve: {
        modules: [
            path.join(APP_DIR, "./"),
            "node_modules"
        ]
    },

  watch: true
};

module.exports = config;