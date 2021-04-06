import path from "path";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");
const CSSOWebpackPlugin = require("csso-webpack-plugin").default;
const TerserPlugin = require("terser-webpack-plugin");
const babelRc = require("./.babelrc.json");

export default function createConfig(outputPath) {
    return {
        entry: {
            header: "./components/header",
        },
        output: {
            path: outputPath || path.resolve(__dirname, "..", "_assets", "components"),
            publicPath: '/_assets/',
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
                    exclude: path.resolve(__dirname, 'node_modules'),
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
