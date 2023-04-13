import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Icon from '../MaterialIcons';

export const Interactive: React.FC<{}> = (props: {}) =>
    <div className="col">
        <Link className="padded" to="/projects/" style={{alignSelf: "start"}}>
            <div className="row row-uberpadded">
                <Icon icon="arrow_back" icontype="material-symbols-outlined"></Icon>
                <p><u className="bold">Back</u></p>
            </div>
        </Link>
        <Outlet />
    </div>;

export default Interactive;