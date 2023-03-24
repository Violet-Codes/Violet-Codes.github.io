import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

import Navbar from './Navbar';
import Extras from './Extras';
import Nugget from './Nugget';
import Icon from './MaterialIcons';
import Pfp from './Pfp';
import Dropdown from './Dropdown';
import Project from './Project';
import { useMeasure } from 'react-use';
import { animated, useSpring } from 'react-spring';
import { relative } from 'path';

export const App: React.FC<{}> = (props: {}) =>
    <div className="app">
        <Navbar />
        <Routes>
            <Route path="/" element={<Content />}>
                <Route path="" element={<Home />} />
                <Route path="projects/" element={<Outlet />}>
                    <Route path="" element={<ProjectsPage />} />
                    <Route path="*" element={<Err404 />} />
                </Route>
                <Route path="*" element={<Err404 />} />
            </Route>
        </Routes>
        <Extras />
    </div>;

const Content: React.FC<{}> = (props: {}) =>
    <main>
        <Outlet />
    </main>;

const Home: React.FC<{}> = (props: {}) =>
    <div className="dark stack">
        <div className="col" style={{alignItems: "stretch"}}>
            <Jumbo/>
            <div className="col" style={{alignItems: "stretch"}}>
                <div className="padded darker box">
                    <div className="col" style={{alignItems: "start"}}>
                        <h2>
                            About me
                        </h2>
                        <p>
                            I am a self-taught developer with an affinity for mathematics and its applications in development.<br/>
                            I program mainly in Haskell, Rust, and TypeScript.<br/>
                            I excel at learning and applying design patterns such as Composition, Dependency Injection and Mutability Safety.
                        </p>
                    </div>
                </div>
            </div>
            <div className="padded col" style={{alignItems: "center"}}>
                <Projects />
            </div>
        </div>
    </div>;

const Jumbo: React.FC<{}> = (props: {}) =>
    <>
        <Nugget />
        <div className="padded row" style={{alignItems: "stretch", flexWrap: "wrap"}}>
            <Pfp stylised={true} />
            <Nugget />
            <div className="col" style={{alignItems: "flex-start"}}>
                <h1>
                    Violet-Codes
                </h1>       
                <p className="highlight highlight-gradient">
                    <Icon icon="female" /> Graphics Designer && Developer
                </p>
            </div>
        </div>
        <Nugget />
    </>;

const Projects: React.FC<{}> = (props: {}) => {
    const [measureRef, dims] = useMeasure<HTMLDivElement>();
    const css = useSpring({
        from: {
            width: 0,
            overflow: "auto",
            justifyContent: "start"
        },
        to: {
            width: dims.width
        }
    });
    return (
        <div className="padded col" style={{alignSelf: "stretch"}}>
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
            </div>
            <div ref={measureRef} style={{alignSelf: "stretch"}}/>
            <animated.div className="row" style={css}>
                <Project name="example a" icon="info" desc={["It does stuff,", "very good stuff"]} interactive/>
                <Project name="example b" icon="info" desc={["It does stuff,", "very good stuff"]}/>
                <Project name="example c" icon="info" langs={["lang0", "lang1", "lang2"]}/>
                <Project name="brainfuck-optimiser" icon="terminal" desc={["Brainfuck...", "...fucks the brain"]} langs={["lang0", "lang1", "lang2"]} interactive/>
                <Project name="example d" icon="info"/>
                <Project name="example e" icon="info" desc={["It does stuff,", "very good stuff"]} langs={["lang0", "lang1", "lang2"]}/>
                <Project name="example f" icon="info" langs={["lang0", "lang1", "lang2"]} interactive/>
                <Project name="example g" icon="info" desc={["It does stuff,", "very good stuff"]} interactive/>
                <Project name="example h" icon="info" langs={["lang0", "lang1", "lang2"]}/>
                <Project name="example i" icon="info" desc={["It does stuff,", "very good stuff"]}/>
                <Project name="example j" icon="info" langs={["lang0", "lang1", "lang2"]} interactive/>
            </animated.div>
        </div>
    );
};

const ProjectsPage: React.FC<{}> = (props: {}) =>
    <div className="dark padded">
        <div className="box">
            <div>
                <h2>
                    Hi there! <Icon icon="waving_hand" />
                </h2>
                <p>
                    I am a self-taught developer with an affinity for mathematics and its applications in development.<br/>
                    I program mainly in Haskell, Rust, and TypeScript.<br/>
                    I excel at learning and applying design patterns such as Composition, Dependency Injection and Mutability Safety.
                </p>
            </div>
        </div>
    </div>;

const Err404: React.FC<{}> = (props: {}) =>
    <div className="dark padded">
        <div className="box">
            <div>
                <h3>
                    Error 404!
                </h3>
                <p>
                    The page you are looking for does not exist!<br/>
                    Check if your URL is correct.
                </p>
            </div>
        </div>
    </div>;

export default App;
