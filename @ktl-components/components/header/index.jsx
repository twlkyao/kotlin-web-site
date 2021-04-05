import Logo from './brand';
import Menu from './menu';
import SearchIcon from './search-icon';

import { wrap as cssHeader } from './header.css'

export default function Header({ version, releaseUrl }) {
    return <header className={cssHeader}>
        <Logo version={version} url={releaseUrl}/>
        <Menu/>
        <SearchIcon/>
    </header>
}
