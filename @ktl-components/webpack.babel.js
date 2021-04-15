import {resolve} from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import svgToMiniDataURI from "mini-svg-data-uri";
import CSSOWebpackPlugin from "csso-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import babelRc from "./.babelrc.json";

export default function createConfig(outputPath) {
    return {
        entry: {
            header: "./components/header",
        },
        output: {
            path: outputPath || resolve(__dirname, './dist'),
            libraryTarget: "commonjs2",
            clean: true,
        },
        resolve: {
            extensions: [".js", ".json", ".jsx", ".css"],
        },
        externals: {
            'react': {
                root: 'React',
                commonjs: 'react',
                commonjs2: 'react',
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs: 'react-dom',
                commonjs2: 'react-dom',
            },
        },
        stats: {
            children: true,
        },
        optimization: {
            minimizer: [
                new CSSOWebpackPlugin(),
                new TerserPlugin(),
            ],
        },
        plugins: [
            new MiniCssExtractPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx|mjs)$/,
                    loader: "babel-loader",
                    type: "javascript/auto",
                    exclude: resolve(__dirname, 'node_modules'),
                    options: {...babelRc}
                },
                {
                    test: /\.p?css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: true,
                                modules: {
                                    namedExport: true,
                                },
                            },
                        },
                        {
                            loader: "css-loader",
                            options: {
                                esModule: true,
                                sourceMap: true,
                                modules: {
                                    compileType: "module",
                                    mode: "local",
                                    localIdentName: "ktl-[path][local]--[hash:base64:5]",
                                    namedExport: true,
                                    exportLocalsConvention: "camelCaseOnly",
                                },
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [ "postcss-preset-env" ],
                                },
                            },
                        }
                    ],
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 10000,
                                encoding: "utf8",
                                esModule: false,
                                generator: (content, mimetype, encoding) => svgToMiniDataURI(content.toString(encoding)),
                            },
                        },
                        {
                            loader: "svgo-loader",
                        },
                    ],
                },
            ],
        },
    };
}
