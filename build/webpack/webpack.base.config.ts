/// <reference path="../@types/vue-loader/index.d.ts" />

import * as webpack from 'webpack';
import * as path from 'path';
import * as VueLoaderPlugin from 'vue-loader/lib/plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as HtmlPlugin from 'html-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const mode = process.env.ENV;

const isProduction = (mode === "production");

import env from './env';

module.exports = {
    entry: {
        index: path.resolve("src/index.ts"),
    },
    output: {
        publicPath: "/",
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
        alias: {
            vue$: "vue/dist/vue.runtime.esm.js",
            "@": path.resolve("src"),
            mixins: path.resolve("src/resources/mixins"),
            utils: path.resolve("src/utils"),
            "utils-scss": path.resolve("src/utils/scss/utils-scss.scss")
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: "vue-loader"
        },
        {
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules(?![/|\\](dom7|swiper|vue-echarts-v3))/
        },
        {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
                "babel-loader",
                {
                    loader: "ts-loader",
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        transpileOnly: true
                    }
                }
            ]
        },
        {
            test: /\.tsx$/,
            exclude: /node_modules/,
            use: [
                "babel-loader",
                {
                    loader: "ts-loader",
                    options: {
                        appendTsxSuffixTo: [/\.vue$/],
                        transpileOnly: true
                    }
                }
            ]
        },
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: !isProduction,
                    },
                },
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: !isProduction
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: !isProduction
                    }
                },
            ]
        },

        {
            test: /\.(png|jpe?g|gif|svg)$/,
            include: /images/,
            loader: "url-loader",
            query: {
                limit: 1,
                name: "asset/images/[hash:16].[ext]"
            }
        },
        {
            test: /\.(ttf|woff2?|eot|svg)$/,
            include: /font/,
            loader: "url-loader",
            query: {
                limit: 1,
                name: "asset/fonts/[name].[hash:7].[ext]"
            }
        }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            maxInitialRequests: 30,
            maxAsyncRequests: 30,
            minSize: 2048,
            cacheGroups: {
                default: {
                    priority: -20,
                    reuseExistingChunk: true,
                    minChunks: 20,
                },
                'vendors/library': {
                    name: 'vendors/library',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                'vendors/vue-bucket': {
                    name: 'vendors/vue-bucket',
                    test: /[\\/]node_modules[\\/](vue|vue-router|vuex|vue-class-component)[\\/]/,
                    priority: -1
                },
            }

        },
        runtimeChunk: {
            name: 'vendors/manifest',
        }
    },
    performance: {
        hints: false
    },
    plugins: [
        new VueLoaderPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: !isProduction,
            vue: true,
            // workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
        }),
        new HtmlPlugin({
            filename: "index.html",
            template: path.resolve("src/index.html"),
            showErrors: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                domain: JSON.stringify(env.domain),
                host: JSON.stringify(env.host),
            },
        }),
        new MiniCssExtractPlugin({
            filename: isProduction ? '[name].[contenthash].css' : '[name].css',
            chunkFilename: isProduction ? '[name].[contenthash].css' : '[name].css'
        }),
    ]
};
