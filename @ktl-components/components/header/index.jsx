import Brand from './brand';
import Navigation from './navigation';
import SearchButton from './search-button';
import MenuButton from './hamburger';

import { wrap as cssHeader, nav as cssNav, controls as cssControls, menu as cssMenu } from './header.css'

const defaultData = [
    {
        children: 'Solutions',
        url: 'https://kotlinlang.org/#solutions',
        items: [
            {
                children: 'Multiplatform Mobile',
                url: "https://kotlinlang.org/lp/mobile/",
            },
            {
                children: 'Server-side',
                url: "https://kotlinlang.org/lp/server-side/",
            },
            {
                children: 'Web frontend',
                url: "https://kotlinlang.org/docs/js-overview.html",
            },
            {
                children: 'Data science',
                url: "https://kotlinlang.org/docs/data-science-overview.html",
            },
            {
                children: 'Android',
                url: "https://kotlinlang.org/docs/android-overview.html",
            },
        ],
    },
    {
        children: 'Docs',
        url: 'https://kotlinlang.org/docs/home.html',
        items: [
            {
                children: 'Kotlin',
                url: "https://kotlinlang.org/docs/home.html",
            },
            {
                children: 'KMM',
                url: "https://kotlinlang.org/docs/mobile/home.html",
            },
        ],
    },
    {
        children: 'Community',
        url: 'https://kotlinlang.org/community/',
    },
    {
        children: 'Teach',
        url: 'https://kotlinlang.org/education/',
    },
    {
        children: 'Play',
        url: 'https://play.kotlinlang.org',
    },
];

export default function Header({ navigationData, releaseUrl, version }) {
    const data = navigationData || defaultData;

    return <header className={cssHeader}>
        <Brand version={version} url={releaseUrl}/>
        <Navigation className={cssNav} data={data}/>
        <div className={cssControls}>
            <SearchButton/>
            <MenuButton className={cssMenu} data={data}/>
        </div>
    </header>
}
