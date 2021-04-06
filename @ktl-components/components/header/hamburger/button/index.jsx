import { button as cssButton } from './button.css';

export default function Button({ className, id }) {
    const linkClassName = [cssButton].concat(className || []).join(' ');

    return (
        <a
            className={linkClassName} href={`#${id}`} type="button"
            aria-label="Open the navigation" aria-expanded="false" aria-controls="menu"
        >
            Menu
        </a>
    );
}
