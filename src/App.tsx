import React from 'react';
import { Routes, Route, Outlet, useSearchParams, Link } from 'react-router-dom';

import Navbar from './Navbar';
import Extras, { FoxGoodbye } from './Extras';
import Nugget from './Nugget';
import Icon from './MaterialIcons';
import Pfp from './Pfp';
import { Projects, ProjectsTitle } from './Project';
import Interactive from './Projects/Interactive';
import BrainfuckOptimiser from './Projects/BrainfuckOptimiser';
import VioletCodes from './Projects/VioletCodes';
import { useMeasure, useSearchParam } from 'react-use';
import { animated, useSpring } from 'react-spring';

export const App: React.FC<{}> = (props: {}) =>
    <div className="app">
        <Navbar />
        <Routes>
            <Route path="/" element={<Content />}>
                <Route path="" element={<Home />} />
                <Route path="projects/" element={<div className="dark"><Outlet /></div>}>
                    <Route path="interactive/" element={<Interactive />}>
                        <Route path="brainfuck-optimiser" element={<BrainfuckOptimiser />} />
                        <Route path="Violet-Codes.github.io" element={<VioletCodes />} />
                        <Route path="*" element={<ProjectErr404 />} />
                    </Route>
                    <Route path="" element={<ProjectsPage />} />
                </Route>
                <Route path="*" element={<Err404 />} />
            </Route>
        </Routes>
        <Extras />
    </div>;

const Content: React.FC<{}> = (props: {}) =>
    <main>
        <div className="dark stack">
            <div className="uberspaced col-uberpadded col" style={{alignItems: "stretch"}}>
                <Outlet />
                <FoxGoodbye />
            </div>
        </div>
    </main>;

const Home: React.FC<{}> = (props: {}) =>
    <>
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
        <div>
            <div className="uberpadded col" style={{alignItems: "center"}}>
                <ProjectsBlock />
            </div>
        </div>
    </>;

const Jumbo: React.FC<{}> = (props: {}) =>
    <>
        <div className="padded row" style={{alignItems: "stretch", flexWrap: "wrap"}}>
            <Pfp />
            <Nugget />
            <div className="bold col" style={{alignItems: "flex-start"}}>
                <h1>
                    Violet-Codes
                </h1>       
                <p className="highlight highlight-gradient" style={{"fontSize": "larger"}}>
                    <Icon icon="female" /> Designer && Developer
                </p>
            </div>
        </div>
    </>;

const ProjectsBlock: React.FC<{}> = (props: {}) => {
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
        <div className="col" style={{alignSelf: "stretch"}}>
            <ProjectsTitle />
            <div ref={measureRef} style={{alignSelf: "stretch"}}/>
            <animated.div className="row" style={css}>
                <Projects />
            </animated.div>
        </div>
    );
};

const ProjectsPage: React.FC<{}> = (props: {}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const lang_ = searchParams.get("lang");
    const lang = lang_ ? lang_ : undefined;
    return (
        <div className="col">
            { lang &&
                <div className="row" style={{whiteSpace: "nowrap", alignSelf: "start"}}>
                    <Icon icon="filter_alt" icontype="material-symbols-outlined" />
                    &#160;<p>{lang}</p>
                    <Link className="padded row" to="/projects/">
                        <Icon icon="close" icontype="material-symbols-outlined" />
                    </Link>
                </div>
            }
            <ProjectsTitle />
            <div className="row" style={{flexWrap: "wrap"}}>
                <Projects lang={lang} />
            </div>
        </div>
    );
};

const Err404: React.FC<{}> = (props: {}) =>
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
    </div>;

const ProjectErr404: React.FC<{}> = (props: {}) =>
    <div className="box">
        <div>
            <h3>
                Error 404!
            </h3>
            <p>
                The project you are looking for does not have an interactive demo!<br/>
                Check if your URL is correct.
            </p>
        </div>
    </div>;

export default App;
