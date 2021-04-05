import { button as cssButton } from './menu-button.css';

export default function MenuButton({ className }) {
    return (
        <a href="#nav-menu" aria-label="Open the navigation" className={[cssButton].concat(className || []).join(' ')} type="button">Open the navigation</a>
    );
}
