import {product as cssBrandName, version as cssVersion} from './brand.css'

export default function Logo({version, url}) {
    return (
        <div>
            <a className={cssBrandName} href="https://kotlinlang.org/">Kotlin</a>
            <sup><a className={cssVersion} href={url} target="_blank">{version}</a></sup>
        </div>
    );
}
