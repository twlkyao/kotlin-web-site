import { Fragment } from 'react';

const menuData = [
    {
        children: 'Solution',
        items: [
            {
                children: 'Multiplatform Mobile',
                url: "/lp/mobile/",
            },
            {
                children: 'Server-side',
                url: "/lp/server-side/",
            },
            {
                children: 'Web frontend',
                url: "/docs/js-overview.html",
            },
            {
                children: 'Data science',
                url: "/docs/data-science-overview.html",
            },
            {
                children: 'Android',
                url: "/docs/android-overview.html",
            },
        ]
    },
    {
        children: 'Docs',
        url: 'https://kotlinlang.org/docs/home.html',
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

function Link(props) {
    return <a {...props}/>;
}

function MenuPopup() {
    return null;
}

function MenuItem({url, ...props}) {
    let Tag = Fragment;

    if (url) {
        const { hostname } = new URL(url);
        Tag = Link;
        props.href = url;
        props.target = hostname !== 'kotlinlang.org' ? '_blank' : null;
    }

    return <Tag {...props}/>;
}

export default function Menu() {
    return <ul>
        {menuData.map(({ items, ...link }, i) => <li key={i}>
            <MenuItem {...link}/>
            { items && Boolean(items.length) && <MenuPopup items={items}/> }
        </li>)}
    </ul>;
}
