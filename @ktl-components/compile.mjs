import { resolve } from 'path';

import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import webpack from 'webpack';
import createConfig from './webpack.babel.js'

function runWebpack(config) {
    const compiler = webpack(config);

    return new Promise((resolve, reject) => {
        compiler.run((err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(res);
        });
    });
}

export default async function main() {
    const name = process.argv[2];
    const props = process.argv[3] ? JSON.parse(process.argv[3]): {};
    const outputDir = resolve(__dirname, './dist');
    await runWebpack(createConfig(outputDir));
    const component = await import(`./dist/${name}.js`);
    const { default: Component } = component;
    console.log(renderToString(createElement(Component, props)));
}
