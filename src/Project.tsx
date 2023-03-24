import React from 'react';
import { Link } from 'react-router-dom';
import Icon from './MaterialIcons';

type ProjectPropT = {
    name: string;
    icon: string;
    interactive?: boolean;
    langs?: string[];
    desc?: string[];
};

export const Project: React.FC<ProjectPropT> = ({name, icon, interactive, langs, desc}: ProjectPropT) =>
    <div className="col rounded bordered padded margined" style={{alignItems: "flex-start", borderTop: "none", borderBottom: "none"}}>
        <div className="row">
            <div className="highlight-gradient" style={{whiteSpace: "nowrap"}}>
                <p>
                    <Icon icon={icon}/>&#160;{name}
                </p>
            </div>
        </div>
        <div className="spaced row" style={{justifyContent: "space-between", alignSelf: "stretch"}}>
            <Link className="row" style={{justifySelf: "flex-start"}} to={`https://github.com/Violet-Codes/${name.toLowerCase()}/`} target="_blank" rel="noopener noreferrer">
                <Icon icon="code" />&#160;Github
            </Link>
            <div style={{whiteSpace: "nowrap"}}>
                <Icon icon="star"/><b>----</b>
            </div>
        </div>
        &#160;
        { langs && <div className="spaced row">
            { langs.map((lang) =>
                <p><span style={{fontSize: "smaller"}}>
                    <Link className="row" to={`/projects/?lang=${encodeURI(JSON.stringify([lang]))}`}>
                        <Icon style={{fontSize: "smaller"}} icon="fiber_manual_record" icontype="material-symbols-outlined"/><u>{lang}</u>
                    </Link>
                </span></p>
            ) }
        </div> }
        { desc && desc.map((line) =>
            <p>
                {line}
            </p>
        ) }
        { interactive && <Link className="row margined action-gradient" style={{alignSelf: "center"}} to={`/projects/${name.toLowerCase()}/`}>
            <Icon icon="auto_awesome" icontype="material-symbols-outlined"/>
            &#160;<u style={{whiteSpace: "nowrap"}}>Interactive-Demo</u>&#160;
            <Icon icon="magic_button" icontype="material-symbols-outlined"/>
        </Link> }
    </div>;

export default Project;