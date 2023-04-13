import React from 'react';


import pfpStylised from './pfpDarker.png';
import { useWindowSize } from 'react-use';

export const Pfp: React.FC<{}> = (props) => {
    const {width, height} = useWindowSize();
    return (
        <img className="rounded bordered" src={pfpStylised} style={{width: Math.min(480, Math.round(width/2)), height: Math.min(480, Math.round(width/2))}}/>
    );
};

export default Pfp;