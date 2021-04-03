import { shallowRender } from 'preact-render-to-string';
import { h } from 'preact';

export default async function main() {
    const name = process.argv[2];
    const props = process.argv[3] ? JSON.parse(process.argv[3]) : {};
    const { default: Component } = await import(`./${name}/index.jsx`)
    console.log(shallowRender(h(Component, props)));
}
