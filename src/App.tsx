import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import Extras from './Extras';
import Nugget from './Nugget';
import Icon from './MaterialIcons';
import Pfp from './Pfp';
import Dropdown from './Dropdown';

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
        <Outlet />
    </main>;

const Home: React.FC<{}> = (props: {}) =>
    <div className="col" style={{"alignItems": "stretch"}}>
        <div className="padded dark row" style={{"alignItems": "stretch"}}>
            <Pfp stylised={true} />
            <Nugget />
            <div className="col" style={{"alignItems": "flex-start"}}>
                <h1>
                    Violet-Codes
                </h1>       
                <p className="highlight">
                    <Icon icon="female" /> Graphics Designer && Developer
                </p>
            </div>
        </div>
        <div className="col" style={{"alignItems": "stretch"}}>
            <div className="highlight-block">
                <Nugget />
            </div>
            <div className="padded darker box">
                <div className="col" style={{"alignItems": "start"}}>
                    <h2>
                        About me
                    </h2>
                    <p>
                        I am a self-taught developer with an affinity for mathematics and its applications in development.<br/>
                        I program mainly in Haskell, Rust, and Python.<br/>
                        I excel at learning and applying design patterns such as Composition, Dependency Injection and Mutability Safety.
                    </p>
                </div>
            </div>
            <div className="highlight-block">
                <Nugget />
            </div>
        </div>
        <div className="padded dark col" style={{"alignItems": "center"}}>
            <div className="padded rounded bordered margined col" style={{"alignItems": "start", "alignSelf": "start"}}>
                <Dropdown Controller={({callback, isVisible}) =>
                    <div className="row">
                        <div className="box" onClick={callback}>
                            <Icon icon={isVisible ? "unfold_less" : "unfold_more"} className="rounded margined hover action-block" style={{"fontSize": "xx-large"}}/>
                        </div>
                        <h3>
                            Lorem Ipsum
                        </h3>
                    </div>
                }>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
                        Orci dapibus ultrices in iaculis nunc.
                    </p>
                </Dropdown>
            </div>
            <div className="padded rounded bordered margined col" style={{"alignItems": "start", "alignSelf": "end"}}>
                <Dropdown Controller={({callback, isVisible}) =>
                    <div className="row" style={{"alignSelf": "flex-end"}}>
                        <div className="box" onClick={callback}>
                            <Icon icon={isVisible ? "unfold_less" : "unfold_more"} className="rounded margined hover action-block" style={{"fontSize": "xx-large"}}/>
                        </div>
                        <h3>
                            Lorem Ipsum
                        </h3>
                    </div>
                }>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
                        Eu turpis egestas pretium aenean pharetra magna ac placerat.
                    </p>
                </Dropdown>
            </div>
            <div className="padded rounded bordered margined col" style={{"alignItems": "start", "alignSelf": "start"}}>
                <Dropdown Controller={({callback, isVisible}) =>
                    <div className="row">
                        <div className="box" onClick={callback}>
                            <Icon icon={isVisible ? "unfold_less" : "unfold_more"} className="rounded margined hover action-block" style={{"fontSize": "xx-large"}}/>
                        </div>
                        <h3>
                            Lorem Ipsum
                        </h3>
                    </div>
                }>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/>
                        Viverra mauris in aliquam sem fringilla ut.
                    </p>
                </Dropdown>
            </div>
        </div>
    </div>;

const AboutMe: React.FC<{}> = (props: {}) =>
    <div className="dark padded">
        <div className="box">
            <div>
                <h2>
                    Hi there! <Icon icon="waving_hand" />
                </h2>
                <p>
                    I am a self-taught developer with an affinity for mathematics and its applications in development.<br/>
                    I program mainly in Haskell, Rust, and Python.<br/>
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
