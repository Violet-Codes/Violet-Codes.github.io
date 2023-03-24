import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './MaterialIcons';

type ProjectPropT = {
    name: string;
    icon: string;
    interactive?: boolean;
    langs?: string[]
};

export const Project: React.FC<ProjectPropT> = ({name, icon, interactive, langs}: ProjectPropT) =>
    <div className="col rounded bordered padded margined" style={{alignItems: "flex-start", borderTop: "none", borderBottom: "none"}}>
        <div className="row highlight-gradient" style={{whiteSpace: "nowrap"}}>
            <p>
                <Icon icon={icon} /> &#160;{name}
            </p>
        </div>
        <Link className="row" to={`https://github.com/Violet-Codes/${name.toLowerCase()}/`} target="_blank" rel="noopener noreferrer">
            <u>Github</u><Icon icon="code" />
        </Link>
        { interactive ? <Link className="row" to={`/projects/${name.toLowerCase()}/`}>
            <u>Interactive</u><Icon icon="apps" />
        </Link> : <Icon icon="horizontal_rule" />}
    </div>;

export default Project;