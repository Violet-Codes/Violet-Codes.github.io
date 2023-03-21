import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './MaterialIcons';

type ProjectPropT = {
    name: string;
    icon: string;
    interactive?: boolean;
};

export const Project: React.FC<ProjectPropT> = ({name, icon, interactive}: ProjectPropT) =>
    <div className="col rounded bordered padded margined" style={{alignItems: "flex-start"}}>
        <p>
            <div className="row action-gradient">
                <Icon icon={icon} /> &#160;{name}
            </div>
        </p>
        <Link className="row" to="https://duckduckgo.com/">
            <u>Github</u><Icon icon="code" />
        </Link>
        { interactive && <Link className="row" to={`/projects/${name.toLowerCase()}/`}>
            <u>Interactive</u><Icon icon="apps" />
        </Link> }
    </div>;

export default Project;