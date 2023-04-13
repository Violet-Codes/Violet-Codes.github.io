import React, { useEffect, useState } from 'react';
import Icon from './MaterialIcons';
import { Link } from 'react-router-dom';

type BlogPropT = {
    name: string;
    icon: string;
    icontype?: "material-icons" | "material-symbols-outlined";
    desc?: string[];
};

export const Blog: React.FC<BlogPropT> = ({name, icon, icontype, desc}: BlogPropT) =>
    <div className="col rounded bordered padded margined" style={{alignItems: "flex-start"}}>
        <div className="row" style={{whiteSpace: "nowrap"}}>
            <Icon className="highlight" icon={icon} icontype={icontype}/>&#160;
            <Link className="highlight-gradient" style={{alignSelf: "center"}} to={`/blogs/blog/${name}/`}>
                <u className="bold" style={{whiteSpace: "nowrap"}}>{name}</u>
            </Link>
        </div>
        { desc && desc.map((line, index) =>
            <p key={index} style={{whiteSpace: "nowrap"}}>
                {line}
            </p>
        ) }
    </div>;

export const BlogsTitle: React.FC<{}> = (props: {}) =>
    <div className="row">
        <div className="reverse-action-gradient">
            <Icon icon="star"/>
            &#160;&#160;&#160;
            <Icon icon="magic_button" icontype="material-symbols-outlined"/>
            &#160;&#160;
            <Icon icon="auto_awesome" icontype="material-symbols-outlined"/>
            &#160;&#160;&#160;
        </div>
        <Link to="/Blogs/">
            <h2>
                <u>Blogs</u>
            </h2>
        </Link>
        <div className="action-gradient">
            &#160;&#160;
            <Icon icon="magic_button" icontype="material-symbols-outlined"/>
            &#160;&#160;&#160;
            <Icon icon="auto_awesome" icontype="material-symbols-outlined"/>
            &#160;&#160;
            <Icon icon="star"/>
        </div>
    </div>;



export const Blogs: React.FC<{}> = (props: {}) =>
    <>
        <Blog name="Monads-for-the-layman" icon="function" icontype="material-symbols-outlined" desc={["Yet another blog", "about monads"]} />
    </>;

export default Blog;