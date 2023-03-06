import React, {ReactNode} from 'react';
import { Link } from 'react-router-dom';
import Icon from './MaterialIcons';

export const NavBar: React.FC<{}> = (props: {}) =>
    <header>
        <div className="darker navbar">
            <NavLink to="/">
                <u>Home</u><Icon icon="home" />
            </NavLink>
            <NavLink to="/about/">
                <u>About</u><Icon icon="info" />
            </NavLink>
            <NavLink to="/err/">
                <u>Err404</u><Icon icon="warning" />
            </NavLink>
        </div>
    </header>

type NavLinkPropT = {
    to: string;
    children: ReactNode | ReactNode[];
};

const NavLink: React.FC<NavLinkPropT> = (props: NavLinkPropT) =>
    <div className="item">
        <Link to={props.to}>
            {props.children}
        </Link>
    </div>

export default NavBar;