import { shallowRender } from 'preact-render-to-string';
import { h } from 'preact';

export default async function () {
    const name = process.argv[2];
    const { default: Component } = await import(`./${name}/index.jsx`)
    console.log(shallowRender(h(Component)));
}
