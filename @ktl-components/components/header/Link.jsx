export default function Link({ url, children, ...props }) {
    const isExternal = new URL(url).hostname !== 'kotlinlang.org';

    return (
        <a target={isExternal ? '_blank' : null } href={url} {...props}>
            {children}{isExternal && '\u00A0↗'}
        </a>
    );
}
