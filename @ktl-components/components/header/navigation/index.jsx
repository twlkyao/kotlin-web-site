import { menu as cssMenu, item as cssItem, link as cssLink } from './menu.css';


function MenuPopup() {
    return null;
}

function MenuItem({url, children}) {
    const isExternal = new URL(url).hostname !== 'kotlinlang.org';

    return (
        <a target={isExternal ? '_blank' : null } href={url} className={cssItem}>
            {children}{isExternal && '\u00A0↗'}
        </a>
    );
}

export default function Menu({ className, data }) {
    return <nav className={[cssMenu].concat(className || []).join(' ')}>{
        (data || []).map((item, i) => <MenuItem {...item} key={i}/>)
    }</nav>;
}
