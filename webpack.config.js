const path = require("path");

module.exports = {
    mode: 'production',
    entry: {
        app: path.resolve(__dirname, "src", "index.js"),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./public')
    },
};
