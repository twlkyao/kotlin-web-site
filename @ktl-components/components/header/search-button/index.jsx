import { button as cssButton, buttonDisabled as cssButtonDisabled } from './search-button.css';

export default function SearchButton({ className, ...props }) {
    const btnClassName = [cssButton].concat(className);
    if (!props.onClick) btnClassName.push(cssButtonDisabled);
    return <button type="button" {...props} className={btnClassName.join(' ')} >search</button>;
}
