import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import Extras from './Extras';

export const App: React.FC<{}> = (props: {}) =>
    <div className="app">
        <Navbar />
        <Routes>
            <Route path="/" element={<Content />}>
                <Route path="" element={<AboutMe />} />
                <Route path="*" element={<Err404 />} />
            </Route>
        </Routes>
        <Extras />
    </div>;

const Content: React.FC<{}> = (props: {}) =>
    <main>
        <div className="content">
            <Outlet />
        </div>
    </main>;

const AboutMe: React.FC<{}> = (props: {}) =>
    <>
        <h1>
            Hi there! 👋
        </h1>
        <div>
            I am a self-taught developer with an affinity for mathematics and its applications in development.<br/>
            I program mainly in Haskell, Rust, and Python.<br/>
            I excel at learning and applying design patterns such as Composition, Dependency Injection and Mutability Safety.
        </div>
    </>;

const Err404: React.FC<{}> = (props: {}) =>
    <>
        <h1>
            Error 404!
        </h1>
        <div>
            The page you are looking for does not exist!<br/>
            Check if your URL is correct.
        </div>
    </>;

export default App;
