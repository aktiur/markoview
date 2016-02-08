/**
 * Created by Arthur on 06/02/2016.
 */

const path = require("path");

module.exports = {
    entry: path.resolve("./src/app.js"),
    output: {
        path: path.join(__dirname, 'assets'),
        publicPath: "/assets/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js/, exclude: /node_modules/, loader: "babel", query: { presets: ['es2015'] } }
        ]
    },
    devtool: '#inline-source-map'
};
