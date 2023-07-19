import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './MaterialIcons';
import { Octokit } from "octokit";

const octokit = new Octokit();

type ProjectPropT = {
    name: string;
    icon: string;
    icontype?: "material-icons" | "material-symbols-outlined";
    interactive?: boolean;
    langs?: string[];
    desc?: string[];
    fork?: boolean
};

export const Project: React.FC<ProjectPropT> = ({name, icon, icontype, interactive, langs, desc, fork}: ProjectPropT) => {
    const [stars, setStars] = useState<[number] | null>(null);
    useEffect(() => {
        octokit.rest.repos.get({
            owner: "Violet-Codes",
            repo: name
        }).then(repo => setStars([repo.data.stargazers_count])).catch(console.error)
    }, []);
    return (
        <div className="col rounded bordered padded margined" style={{alignItems: "flex-start", order: stars ? -stars[0] : 1}}>
            <div className="row highlight-gradient" style={{whiteSpace: "nowrap"}}>
                <Icon icon={icon} icontype={icontype}/>&#160;
                <p className="bold">{name}</p>
            </div>
            <div className="spaced row" style={{justifyContent: "space-between", alignSelf: "stretch"}}>
                <Link className="row" style={{justifySelf: "flex-start"}} to={`https://github.com/Violet-Codes/${name}/`} target="_blank" rel="noopener noreferrer">
                    <Icon icon="code" />&#160;<p className="mono">Github</p>
                </Link>
                { fork ?
                    <Icon className="rounded bordered" icon="call_split" icontype="material-symbols-outlined" /> :
                    <div style={{whiteSpace: "nowrap"}}>
                        <Icon icon="star"/><b className="bold">{stars ? stars[0] : "..."}</b>
                    </div>
                }
                
            </div>
            &#160;
            { langs && <div className="spaced row">
                { langs.map((lang, index) =>
                    <p key={index}><span style={{fontSize: "smaller"}}>
                        <Link className="mono row" to={`/projects/?lang=${encodeURI(lang)}`}>
                            <Icon style={{fontSize: "smaller"}} icon="fiber_manual_record" icontype="material-symbols-outlined"/><u>{lang}</u>
                        </Link>
                    </span></p>
                ) }
            </div> }
            { desc && desc.map((line, index) =>
                <p key={index} style={{whiteSpace: "nowrap"}}>
                    {line}
                </p>
            ) }
            { interactive && <Link className="row margined action-gradient" style={{alignSelf: "center"}} to={`/projects/interactive/${name}/`}>
                <Icon icon="auto_awesome" icontype="material-symbols-outlined"/>
                &#160;<u className="bold" style={{whiteSpace: "nowrap"}}>Interactive-Demo</u>&#160;
                <Icon icon="magic_button" icontype="material-symbols-outlined"/>
            </Link> }
        </div>
    );
};

export const ProjectsTitle: React.FC<{}> = (props: {}) =>
    <div className="row">
        <div className="reverse-action-gradient">
            <Icon icon="star"/>
            &#160;&#160;
            <Icon icon="magic_button" icontype="material-symbols-outlined"/>
            &#160;&#160;&#160;
            <Icon icon="auto_awesome" icontype="material-symbols-outlined"/>
            &#160;&#160;
        </div>
        <Link to="/projects/">
            <h2>
                <u>Projects</u>
            </h2>
        </Link>
        <div className="action-gradient">
            &#160;&#160;&#160;
            <Icon icon="magic_button" icontype="material-symbols-outlined"/>
            &#160;&#160;
            <Icon icon="auto_awesome" icontype="material-symbols-outlined"/>
            &#160;&#160;&#160;
            <Icon icon="star"/>
        </div>
    </div>;

type ProjectsPropT = {
    lang?: string;
};

export const Projects: React.FC<ProjectsPropT> = ({lang}: ProjectsPropT) =>
    <>
        {
            (!lang || lang == "rust" || lang == "typescript") &&
            <Project name="Violet-Codes.github.io" icon="web" icontype="material-symbols-outlined" desc={["This portfolio site"]} langs={["typescript", "rust"]} interactive/>
        }
        {   (!lang || lang == "rust") &&
            <Project name="nibbler" icon="abc" icontype="material-symbols-outlined" desc={["A simple and lightweight", "parser combinator library"]} langs={["rust"]}/>
        }
        {   (!lang || lang == "rust") &&
            <Project name="brainfuck-optimiser" icon="terminal" desc={["A brainfuck parser", "with a custom optimised bytecode"]} langs={["rust"]} interactive/>
        }
        {   (!lang || lang == "typescript") &&
            <Project name="time-travel" icon="phishing" icontype="material-symbols-outlined" desc={["React hooks for async communication"]} langs={["typescript"]}/>
        }
    </>;

export default Project;
