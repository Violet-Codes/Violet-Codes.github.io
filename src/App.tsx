import React from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

export const App: React.FC<{}> = (props: {}) =>
    <>
        <Link to="/">
            About
        </Link>
        <Link to="/err/">
            Err404
        </Link>
        <Routes>
            <Route path="/" element={<Hello />}>
                <Route path="" element={<AboutMe />} />
                <Route path="*" element={<Err404 />} />
            </Route>
        </Routes>
    </>;

const Hello: React.FC<{}> = (props: {}) =>
    <>
        <header>
            <h1>
                Hi there! 👋
            </h1>
        </header>
        <Outlet />
    </>;

const AboutMe: React.FC<{}> = (props: {}) =>
    <main>
        <div>
            I am a self-taught developer with an affinity for mathematics and its applications in development.<br/>
            I program mainly in Haskell, Rust, and Python.<br/>
            I excel at learning and applying design patterns such as Composition, Dependency Injection and Mutability Safety.
        </div>
    </main>;

const Err404: React.FC<{}> = (props: {}) =>
    <main>
        <div>
            <h2>
                Error 404!
            </h2>
            The page you are looking for does not exist!<br/>
            Check if your URL is correct.
        </div>
    </main>;

export default App;
