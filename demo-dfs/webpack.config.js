const path = require("path")

module.exports = {
    mode: "development",
    entry: "./demo-dfs/lib/main.js",
    output: {
        filename: "demo-dfs.js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module : {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    }
}