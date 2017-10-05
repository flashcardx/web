let webpack = require('webpack');
let path = require('path');

let BUILD_DIR = path.resolve(__dirname, './public/js');
let APP_DIR = path.resolve(__dirname, '.');
//detects if circular dependency:
let CircularDependencyPlugin = require('circular-dependency-plugin')

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
    }),
        new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // add errors to webpack instead of warnings
        failOnError: true
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