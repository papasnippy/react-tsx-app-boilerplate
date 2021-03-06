const Path = require('path');
const Rimraf = require('rimraf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { LoaderOptionsPlugin, DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
    env = env || {};
    const IS_BUILD = !options.$0.includes('webpack-dev-server');
    const IS_PROD = options.mode ? options.mode === 'production' : IS_BUILD;
    const MODE = IS_PROD ? 'production' : 'development';
    const PORT = env.port || 27000;
    const CHUNK_TYPE = IS_BUILD ? 'chunkhash' : 'hash';
    const BUILD_PATH = Path.resolve(__dirname, 'build');
    const URL_LOADER_LIMIT = env.urlloaderlimit || 65536;
    const BASE_URL = env.baseurl || '';
    const ANALYZE = env.analyze || false;

    console.log(`Settings:`);
    console.log(`- Mode: ${MODE}`);

    if (IS_BUILD) {
        console.log(`- Build path: ${BUILD_PATH}`);
    } else {
        console.log(`- Port: ${PORT}`);
    }

    console.log(`- Url loader limit: ${URL_LOADER_LIMIT} bytes`);
    console.log(`- Base url: "${BASE_URL}"`);
    console.log(``);

    if (IS_BUILD) {
        Rimraf.sync(BUILD_PATH);
    }

    function createStyleSheetLoader(modules) {
        let rules = [
            (
                modules
                    ? {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    }
                    : {
                        loader: 'css-loader'
                    }
            ),
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
        ];

        return {
            test: /(\.css$|\.scss$)/,
            include: [
                Path.resolve(__dirname, modules ? 'src' : 'node_modules')
            ],
            use: (
                IS_BUILD
                    ? ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: rules
                    })
                    : [
                        {
                            loader: 'style-loader'
                        },
                        ...rules
                    ]
            )
        };
    }

    return {
        mode: MODE,
        devtool: IS_PROD ? 'none' : 'source-map',
        performance: {
            // uncomment if you need warnings
            hints: false // IS_PROD && IS_BUILD ? 'warning' : false
        },
        optimization: {
            minimizer: (
                IS_PROD
                    ? [
                        new TerserPlugin({
                            parallel: true,
                            sourceMap: true
                        })
                    ]
                    : []
            )
        },
        entry: {
            app: ['@babel/polyfill', './src/index.tsx']
        },
        output: {
            path: BUILD_PATH,
            filename: `content/[name].[${CHUNK_TYPE}].js`,
            publicPath: IS_BUILD ? '/' + BASE_URL : '/'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.hbs'],
            alias: {
                '~': Path.resolve(__dirname, 'src')
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
            hot: true,
            port: PORT,
            historyApiFallback: true,
            contentBase: [
                Path.resolve(__dirname, 'public')
            ]
        },
        plugins: [
            ANALYZE && new BundleAnalyzerPlugin({
                analyzerMode: 'static'
            }),
            IS_BUILD && new CopyWebpackPlugin([
                {
                    from: 'public/*.ico',
                    to: BUILD_PATH
                }
            ]),
            !IS_BUILD && new HotModuleReplacementPlugin(),
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
                template: Path.resolve(__dirname, 'public/index.hbs'),
                templateParameters: {
                    'PUBLIC_URL': IS_BUILD && BASE_URL ? '/' + BASE_URL : ''
                },
                inject: 'body',
                baseUrl: '/'
            })
        ].filter(v => !!v),
        module: {
            rules: [
                createStyleSheetLoader(true),
                createStyleSheetLoader(false),
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
                    sideEffects: false,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'ts-loader'
                        }
                    ]
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
                    test: /\.hbs$/,
                    loader: 'handlebars-loader'
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
    };
};
