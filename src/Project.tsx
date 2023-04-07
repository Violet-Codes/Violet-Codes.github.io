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
    tools?: string[];
    desc?: string[];
};

export const Project: React.FC<ProjectPropT> = ({name, icon, icontype, interactive, tools, desc}: ProjectPropT) => {
    const [stars, setStars] = useState<[number] | null>(null);
    useEffect(() => {
        octokit.rest.repos.get({
            owner: "Violet-Codes",
            repo: name
        }).then(repo => setStars([repo.data.stargazers_count])).catch(console.error)
    }, []);
    return (
        <div className="col rounded bordered padded margined" style={{alignItems: "flex-start", borderTop: "none", borderBottom: "none", order: stars ? -stars[0] : 1}}>
            <div className="row highlight-gradient" style={{whiteSpace: "nowrap"}}>
                <Icon icon={icon} icontype={icontype}/>&#160;<p>{name}</p>
            </div>
            <div className="spaced row" style={{justifyContent: "space-between", alignSelf: "stretch"}}>
                <Link className="row" style={{justifySelf: "flex-start"}} to={`https://github.com/Violet-Codes/${name}/`} target="_blank" rel="noopener noreferrer">
                    <Icon icon="code" />&#160;Github
                </Link>
                <div style={{whiteSpace: "nowrap"}}>
                    <Icon icon="star"/><b>{stars ? stars[0] : "..."}</b>
                </div>
            </div>
            &#160;
            { tools && <div className="spaced row">
                { tools.map((tool, index) =>
                    <p key={index}><span style={{fontSize: "smaller"}}>
                        <Link className="row" to={`/projects/?lang=${encodeURI(JSON.stringify(tools))}`}>
                            <Icon style={{fontSize: "smaller"}} icon="fiber_manual_record" icontype="material-symbols-outlined"/><u>{tool}</u>
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
                &#160;<u style={{whiteSpace: "nowrap"}}>Interactive-Demo</u>&#160;
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
        <Link className="padded" to="/projects/">
            <h3>
                <u>Projects</u>
            </h3>
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
        <Project name="Violet-Codes.github.io" icon="web" icontype="material-symbols-outlined" desc={["This portfolio site"]} tools={["typescript", "rust"]} interactive/>
        <Project name="nibbler" icon="abc" icontype="material-symbols-outlined" desc={["A simple and lightweight", "parser combinator library"]} tools={["rust"]}/>
        <Project name="brainfuck-optimiser" icon="terminal" desc={["A brainfuck parser", "and optimiser"]} tools={["rust"]} interactive/>
        {/* <Project name="example a" icon="info" desc={["It does stuff,", "very good stuff"]} interactive/>
        <Project name="example b" icon="info" desc={["It does stuff,", "very good stuff"]}/>
        <Project name="example c" icon="info" tools={["lang0", "lang1", "lang2"]}/>
        <Project name="example d" icon="info"/>
        <Project name="example e" icon="info" desc={["It does stuff,", "very good stuff"]} tools={["lang0", "lang1", "lang2"]}/>
        <Project name="example f" icon="info" tools={["lang0", "lang1", "lang2"]} interactive/>
        <Project name="example g" icon="info" desc={["It does stuff,", "very good stuff"]} interactive/>
        <Project name="example h" icon="info" tools={["lang0", "lang1", "lang2"]}/>
        <Project name="example i" icon="info" desc={["It does stuff,", "very good stuff"]}/>
        <Project name="example j" icon="info" tools={["lang0", "lang1", "lang2"]} interactive/> */}
    </>;

export default Project;