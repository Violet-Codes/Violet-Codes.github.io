import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import Extras from './Extras';
import Image from './Image';
import Nugget from './Nugget';

import pfpOriginal from './pfpOriginal.png';
import pfpStylised from './pfpStylisedDarker.png';

export const App: React.FC<{}> = (props: {}) =>
    <div className="app">
        <Navbar />
        <Routes>
            <Route path="/" element={<Content />}>
                <Route path="" element={<Home />} />
                <Route path="about/" element={<AboutMe />} />
                <Route path="*" element={<Err404 />} />
            </Route>
        </Routes>
        <Extras />
    </div>;

const Content: React.FC<{}> = (props: {}) =>
    <main>
        <div className="dark content">
            <Outlet />
        </div>
    </main>;

const Home: React.FC<{}> = (props: {}) =>
    <div className="row" style={{"alignItems": "stretch"}}>
        <div className="col" style={{"justifyContent": "space-evenly"}}>
            <Nugget className="rounded bordered" />
            <Nugget className="rounded bordered" />
        </div>
        <Nugget />
        <Image className="rounded bordered" url={pfpStylised} width={320} height={320}/>
        <Nugget />
        <div className="col" style={{"alignItems": "flex-start"}}>
            <h1>
                Violet-Codes
            </h1>
            <p className="bold">
                Graphics Designer && Developer
            </p>
        </div>
    </div>;

const AboutMe: React.FC<{}> = (props: {}) =>
    <div className="col">
        <div>
            <h2>
                Hi there! 👋
            </h2>
            <p>
                I am a self-taught developer with an affinity for mathematics and its applications in development.<br/>
                I program mainly in Haskell, Rust, and Python.<br/>
                I excel at learning and applying design patterns such as Composition, Dependency Injection and Mutability Safety.
            </p>
        </div>
    </div>;

const Err404: React.FC<{}> = (props: {}) =>
    <div className="col">
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

export default App;
