import * as webpack from 'webpack';
import * as path from 'path';
import * as merge from 'webpack-merge';

import * as baseConfig from './webpack.base.config';

import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

import * as os from 'os';
const networkInterfaces = os.networkInterfaces();

import buddha from './buddha';
import env from './env';

let ip = "";
for (var key in networkInterfaces) {
    networkInterfaces[key].forEach(item => {
        if (!item.internal && item.family === "IPv4") {
            ip = item.address;
        }
    });
}

const port = 14826;

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        clientLogLevel: 'error',
        host: ip,
        port,
        hot: true,
        open: true,
        historyApiFallback: true,
        quiet: true,
        overlay: true
    },
    entry: {
        index: [path.resolve("src/index.ts")]
    },
    devtool: "#cheap-module-source-map",
    watchOptions: {
        ignored: /node_modules/,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    ...buddha
                ],
                notes: [
                    `Welcome Developer!`,
                    ``,
                    `Your app is running at http://${ip}:${port}`,
                    `And Your requests will post to >>> dev.${env.host === 'default' ? 'ci' : env.host}`
                ],
            },
        }),
    ]
});
