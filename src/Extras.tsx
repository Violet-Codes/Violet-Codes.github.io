import React from 'react';
import Nugget from './Nugget';
import Icon from './MaterialIcons';

import foxlogo from './foxlogo.png';

export const Extras: React.FC<{}> = (props: {}) =>
    <footer>
        <div className="darker padded spaced row extras" style={{flexWrap: "wrap"}}>
            <div className="col">
                <h3>
                    Accounts:
                </h3>
                <a href="https://github.com/Violet-Codes">
                    <u className="bold">Github</u>
                </a>
                <a href="https://www.linkedin.com/in/violet-emmott/">
                    <u className="bold">LinkedIn</u>
                </a>
            </div>
            <Nugget />
            <p>
                All projects listed<br/>
                (with the exception of forks)<br/>
                entirely consist of my own work.
            </p>
            <Nugget />
            <div className="col">
                Contact me at:
                <a href="mailto: vye.codes@gmail.com">
                    <u className="bold">vye.codes@gmail.com</u>
                </a>
            </div>
        </div>
    </footer>;

export const FoxGoodbye: React.FC<{}> = (props: {}) =>
    <div className="uberspaced row">
        <Icon className="highlight" icon="star"/>
        <img src={foxlogo} style={{width: 80, height: 80}}/>
        <Icon className="highlight" icon="star"/>
    </div>;

export default Extras;