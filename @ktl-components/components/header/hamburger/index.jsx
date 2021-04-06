import {Fragment} from 'react';
import Button from './Button';
import Link from '../Link';

import {
    item as cssItem, mobilePopup as cssMobilePopup, heading as cssHeading,
    subItem as cssSubItem, subHeading as cssSubHeading
} from './hamburger.css';

function SubMenu({ data }) {
    const list = data || [];

    return (
        <ul>{
            (list || []).map((item, i) => (
                <li key={i} className={cssSubItem}>
                    <Link {...item} className={cssSubHeading}/>
                </li>
            ))
        }</ul>
    );
}

function MenuPopup({data, ...props}) {
    const list = data || [];

    return (
        <nav>
            <ul className={cssMobilePopup} {...props}>{
                list.map(({items, ...item}, i) => (
                    <li key={i} className={cssItem}>
                        <Link {...item} className={cssHeading}/>
                        {items && <SubMenu data={items}/>}
                    </li>
                ))
            }</ul>
        </nav>
    );
}

export default function MenuButton({className, data}) {
    const id = 'ktl-open-nav-menu';

    return (
        <Fragment>
            <Button className={className} id={id}/>
            <MenuPopup id={id} data={data}/>
        </Fragment>
    );
}
