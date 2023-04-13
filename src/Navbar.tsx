import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './MaterialIcons';

export const NavBar: React.FC<{}> = (props: {}) =>
    <header>
        <div className="darker navbar">
            <Link className="bold padded row" to="/">
                <u>Home</u><Icon icon="home" />
            </Link>
            <Link className="bold padded row" to="/projects/">
                <u>Projects</u><Icon icon="apps" />
            </Link>
            <Link className="bold padded row" to="/err/">
                <u>Err404</u><Icon icon="warning" />
            </Link>
        </div>
    </header>;

export default NavBar;