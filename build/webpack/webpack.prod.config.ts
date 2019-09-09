import * as path from 'path';
import * as merge from 'webpack-merge';

import * as baseCfg from './webpack.base.config';

import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

import CleanWebpackPlugin from 'clean-webpack-plugin';

import buddha from './buddha';
import env from './env';

let notes = new Array();

switch (env.domain) {
    case 'development':
        {
            notes = [
                `Welcome Developer!`,
                ``,
                `Compile Successful!`,
                `Your requests will post to >>> dev.${env.host === 'default' ? 'ci' : env.host}`
            ];
            break;
        }
    case 'test':
        {
            notes = [
                `Welcome Test Engineer`,
                ``,
                `Compile Successful!`,
                `Your requests will post to >>> test.${env.host === 'default' ? 'st1' : env.host}`
            ];
            break;
        }
    case 'production':
        {
            notes = [
                `Compile Successful!`
            ];
            break;
        }

}

const timeReverse = new Date().getTime().toString().split('').reverse().join('');

module.exports = merge(baseCfg, {
    mode: 'production',
    output: {
        path: path.resolve('dist'),
        filename: `[name].[contenthash].js`,
        chunkFilename: `[name].[contenthash].js`
    },
    devtool: false,
    stats: false,
    plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    ...buddha
                ],
                notes: [
                    ...notes
                ],
            },
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    safe: true,
                },
            }),
        ]
    }
})
