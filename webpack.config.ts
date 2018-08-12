import * as Path from 'path';
import { Configuration, LoaderOptionsPlugin } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_env: any, options: any) => {
    const IS_PROD = options.mode === 'production';
    const CHUNK_TYPE = IS_PROD ? 'chunkhash' : 'hash';

    return {
        mode: IS_PROD ? 'production' : 'development',
        entry: {
            app: './src/index.tsx'
        },
        output: {
            path: Path.resolve(__dirname, 'build'),
            filename: `content/[name].[${CHUNK_TYPE}].js`,
            // publicPath: IS_PROD ? '/' + packageJson.name : '/'
        },
        resolve: {
            alias: {}
        },
        plugins: [
            IS_PROD && new UglifyJsPlugin({
                parallel: true,
                sourceMap: true
            }),
            IS_PROD && new BundleAnalyzerPlugin({
                analyzerMode: 'static'
            }),
            // IS_PROD && new optimize.CommonsChunkPlugin({
            //     name: 'vendor',
            //     minChunks: module => module.context && module.context.includes('node_modules')
            // }),
            // IS_PROD && new optimize.CommonsChunkPlugin({
            //     name: 'runtime',
            //     minChunks: Infinity
            // }),
            new LoaderOptionsPlugin({
                options: {
                    tslint: {
                        emitErrors: IS_PROD,
                        failOnHint: false
                    },
                    context: '/'
                }
            }),
            new ExtractTextPlugin({
                filename: `content/[name].[${CHUNK_TYPE}].css`,
                disable: false,
                allChunks: true
            }),
            new HtmlWebpackPlugin({
                template: Path.resolve(__dirname, './src/index.html'),
                inject: 'body',
                baseUrl: '/'
            })
        ].filter(v => !!v),
        module: {
            rules: [
                {
                    test: /(\.css$|\.scss$)/,
                    include: [
                        Path.resolve(__dirname, './src')
                    ],
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                query: {
                                    modules: true,
                                    minimize: false,
                                    localIdentName: '[name]__[local]___[hash:base64:5]'
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'resolve-url-loader'
                            },
                            {
                                loader: 'sass-loader',
                                query: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader'
                }
            ]
        }
    } as Configuration;
};
