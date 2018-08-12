import * as Path from 'path';
import * as Rimraf from 'rimraf';
import { Configuration, LoaderOptionsPlugin } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env: any, options: any) => {
    env = env || {};
    const IS_PROD = options.mode === 'production';
    const CHUNK_TYPE = IS_PROD ? 'chunkhash' : 'hash';
    const BUILD_PATH = Path.resolve(__dirname, 'build');
    const URL_LOADER_LIMIT = env.urlloaderlimit || 65536;
    const IS_BUILD = !options.$0.includes('webpack-dev-server');

    console.log(`Settings:`);
    console.log(`- Mode:                ${IS_PROD ? 'production' : 'development'}`);
    console.log(`- Build path:          ${IS_BUILD ? BUILD_PATH : `none`}`);
    console.log(`- Url loader limit:    ${URL_LOADER_LIMIT} bytes`)
    console.log(``);

    if (IS_BUILD) {
        Rimraf.sync(BUILD_PATH);
    }

    return {
        mode: IS_PROD ? 'production' : 'development',
        devtool: IS_PROD ? 'none' : 'source-map',
        entry: {
            app: './src/index.tsx'
        },
        output: {
            path: BUILD_PATH,
            filename: `content/[name].[${CHUNK_TYPE}].js`,
            // publicPath: IS_PROD ? '/' + packageJson.name : '/'
        },
        resolve: {
            alias: {
                '~': Path.resolve(__dirname, './src'),
            }
        },
        plugins: [
            IS_PROD && new UglifyJsPlugin({
                parallel: true,
                sourceMap: true
            }),
            IS_PROD && new BundleAnalyzerPlugin({
                analyzerMode: 'static'
            }),
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
            }),
            /*new CopyWebpackPlugin([{
                from: './src/404.html',
                to: '../docs/'
            }, {
                from: './src/favicon.ico',
                to: '../docs/'
            }])*/
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
                    test: /(\.css$|\.scss$)/,
                    include: [
                        Path.resolve(__dirname, './node_modules')
                    ],
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            { loader: 'resolve-url-loader' },
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
                    enforce: 'pre',
                    test: /\.tsx?$/,
                    loader: 'tslint-loader'
                },
                {
                    enforce: 'pre',
                    test: /\.jsx?$/,
                    loader: 'source-map-loader'
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader'
                },
                {
                    test: /(\.txt$|\.md)/,
                    use: 'raw-loader'
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },
                {
                    test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                    loader: 'url-loader',
                    query: {
                        limit: URL_LOADER_LIMIT
                    }
                }
            ]
        }
    } as Configuration;
};
