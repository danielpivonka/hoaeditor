const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public'),
    },
    node: { module: "empty", net: "empty", fs: "empty" },
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ['file-loader?name=[name].[ext]'],
            },
        ],
    },
};