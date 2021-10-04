import MenuLinkContext from 'contexts/MenuLinkContext';
import { useRouter } from 'next/router';

interface MenuListProps {
    listStyles?: any
    itemStyles?: any
    linkStyles?: any
}

export default function MenuList({ listStyles = {}, itemStyles = {}, linkStyles = {}}: MenuListProps) {
    const router = useRouter();
    return (
        <ul style={listStyles}>
            <MenuLinkContext.Consumer>
                {value => value.map((link) => <li key={link.path} style={itemStyles}>
                    <a style={linkStyles} href={link.path} className={(router.pathname === link.pathname) ? 'current' : undefined} target={link.target}>{link.text}</a>
                </li>)}
            </MenuLinkContext.Consumer>
        </ul>
    );
}
