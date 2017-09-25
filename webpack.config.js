webpack = require('webpack');
path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcRoot = './src/';
const dstRoot = './build/';
const env = process.env.npm_lifecycle_event;

var isTest = env === 'test' || env === 'test-watch';
var isProd = env === 'build';

webpackConfig = {
    context: __dirname,
    entry: {
        bundle: srcRoot + 'index.tsx'
        // styles: srcRoot + 'main.scss'
    },
    output: {
        filename: '[name].js',
        chunkFilename: 'chunk.[id].[hash].js',
        path: root(dstRoot),
        library: '[name]'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.html'],
        modules: [root(srcRoot), 'node_modules']
    },
    devtool: 'source-map',
    devServer: {
        contentBase: srcRoot,
        historyApiFallback: true,
        stats: 'normal'
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react', 'stage-0', 'stage-1']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                loader: 'file-loader'
            },
            { test: /\.html$/, loader: 'html-loader', include: [root(srcRoot)] }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // Environment helpers
            // this can be used like process.env.ENV === 'build' in application code
            'process.env': {
                ENV: JSON.stringify(env)
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['bundle']
        }),
        new ExtractTextPlugin('styles.css', {
            filename: 'styles.css',
            allChunks: true
        }),
        new webpack.LoaderOptionsPlugin({
            debug: !isProd || !isTest,
            options: {
                context: root(srcRoot),
                output: {
                    path: root(dstRoot)
                },

                sassLoader: {
                    //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
                },

                tslint: {
                    emitErrors: false,
                    failOnHint: false,
                    resourcePath: srcRoot,
                },

                htmlLoader: {
                    minimize: true,
                    removeAttributeQuotes: false,
                    caseSensitive: true,
                    customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]],
                    customAttrAssign: [/\)?\]?=/]
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: srcRoot + 'index.html',
            chunksSortMode: 'dependency',
            hash: true,
            favicon: srcRoot + 'assets/favicon.ico',
            inject: false
        }) //,
        // new webpack.optimize.UglifyJsPlugin({
        //     mangle: { keep_fnames: true },
        //     compress: false,
        //     comments: false,
        //     sourceMap: true
        // })
    ]
};

function root() {
    const args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

module.exports = webpackConfig;