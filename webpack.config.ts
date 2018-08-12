import * as Path from 'path';
import { Configuration } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';



module.exports = (_env: any, options: any) => {
    const IS_PROD = options.mode === 'production';

    return {
        mode: IS_PROD ? 'production' : 'development',
        entry: {
            app: './src/index.tsx'
        },
        output: {
            path: Path.resolve(__dirname, 'build'),
            filename: 'app.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: Path.resolve(__dirname, './src/index.html'),
                inject: 'body',
                baseUrl: '/'
            })
        ],
        module: {
            rules: [
                {
                    test: /(\.css$|\.scss$)/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
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
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader'
                }
            ]
        }
    } as Configuration;
};
