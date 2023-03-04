import React, {ReactNode} from 'react';
import { Link } from 'react-router-dom';

export const NavBar: React.FC<{}> = (props: {}) =>
    <header>
        <div className="darker navbar">
            <NavLink to="/">
                Home
            </NavLink>
            <NavLink to="/about/">
                About
            </NavLink>
            <NavLink to="/err/">
                Err404
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