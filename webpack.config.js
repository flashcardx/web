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
    plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
    ],
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
                {
                loader: 'babel-loader',
                options: {
                    presets: ["es2015", "react", "stage-0"]
                }
            }]
        },
            {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader']
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