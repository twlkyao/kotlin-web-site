import {product as cssBrandName, version as cssVersion, wrap as cssWrap} from './brand.css'

export default function Brand({version, url}) {
    return (
        <div data-nosnippet="true" className={cssWrap}>
            <a className={cssBrandName} href="https://kotlinlang.org/">Kotlin</a>
            <a className={cssVersion} href={url} target="_blank">{version}</a>
        </div>
    );
}
