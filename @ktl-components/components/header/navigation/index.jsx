import Link from "../Link";
import { menu as cssMenu, item as cssItem } from './menu.css';

export default function Menu({ className, data }) {
    const list = data || [];
    const navClassName = [cssMenu].concat(className || []).join(' ');

    return <nav className={navClassName}>{
        list.map(({ items, ...item }, i) => (
            <Link {...item} key={i} className={cssItem}/>
        ))
    }</nav>;
}
