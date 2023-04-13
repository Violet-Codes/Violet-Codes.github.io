import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Icon from '../MaterialIcons';

export const BlogView: React.FC<{}> = (props: {}) =>
    <div className="col">
        <Link className="padded" to="/blogs/" style={{alignSelf: "start"}}>
            <div className="row row-uberpadded">
                <Icon icon="arrow_back" icontype="material-symbols-outlined"></Icon>
                <p><u className="bold">Return to blogs</u></p>
            </div>
        </Link>
        <Outlet />
    </div>;

export default BlogView;