import * as Path from 'path';
import * as Rimraf from 'rimraf';
import { Configuration, LoaderOptionsPlugin, DefinePlugin, HotModuleReplacementPlugin } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// *******************************************************************
// todo:
//  - dev server api fallback
//  - tree shaking
//  - base url
//  - redux
//  - router (+dev tools)
//  - reselect (+dev tools)
//  - axios
//  - testing
// *******************************************************************

module.exports = (env: any, options: any) => {
    env = env || {};
    const IS_PROD = options.mode === 'production';
    const MODE = IS_PROD ? 'production' : 'development';
    const CHUNK_TYPE = IS_PROD ? 'chunkhash' : 'hash';
    const BUILD_PATH = Path.resolve(__dirname, 'build');
    const URL_LOADER_LIMIT = env.urlloaderlimit || 65536;
    const IS_BUILD = !options.$0.includes('webpack-dev-server');
    const BASE_URL = env.baseurl || '';

    console.log(`Settings:`);
    console.log(`- Mode:                ${MODE}`);
    console.log(`- Build path:          ${IS_BUILD ? BUILD_PATH : `none`}`);
    console.log(`- Url loader limit:    ${URL_LOADER_LIMIT} bytes`);
    console.log(`- Base url:            "${BASE_URL}"`);
    console.log(``);

    if (IS_BUILD) {
        Rimraf.sync(BUILD_PATH);
    }

    return {
        mode: MODE,
        devtool: IS_PROD ? 'none' : 'source-map',
        entry: {
            app: './src/index.tsx'
        },
        output: {
            path: BUILD_PATH,
            filename: `content/[name].[${CHUNK_TYPE}].js`,
            publicPath: IS_PROD ? '/' + BASE_URL : '/'
        },
        resolve: {
            alias: {
                '~': Path.resolve(__dirname, './src'),
            }
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    }
                }
            }
        },
        devServer: {
            hot: true
        },
        plugins: [
            IS_PROD && new UglifyJsPlugin({
                parallel: true,
                sourceMap: true
            }),
            IS_PROD && new BundleAnalyzerPlugin({
                analyzerMode: 'static'
            }),
            IS_PROD && new CopyWebpackPlugin([
                {
                    from: 'public/favicon.ico',
                    to: BUILD_PATH
                }
            ]),
            !IS_PROD && new HotModuleReplacementPlugin(),
            new DefinePlugin({
                'process.env': {
                    'ENV': JSON.stringify(MODE),
                    'NODE_ENV': JSON.stringify(MODE),
                    'BASE_URL': IS_PROD ? JSON.stringify(BASE_URL) : 'null'
                }
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
                template: Path.resolve(__dirname, './public/index.html'),
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
