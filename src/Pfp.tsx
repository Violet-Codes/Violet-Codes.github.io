import React from 'react';


import pfpStylised from './pfpDarker.png';

export const Pfp: React.FC<{}> = (props) =>
    <img className="rounded bordered" src={pfpStylised} style={{width: 480, height: 480}}/>;

export default Pfp;