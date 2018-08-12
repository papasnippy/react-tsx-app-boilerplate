import * as Path from 'path';
import { Configuration } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';



module.exports = (_env: object, options: any) => {
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
                    test: /\.css$/, use: 'css-loader'
                },
                {
                    test: /\.tsx?$/, use: 'ts-loader'
                }
            ]
        }
    } as Configuration;
};
