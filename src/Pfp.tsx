import React, { useState } from 'react';

import Icon from './MaterialIcons';

import pfpOriginal from './pfpOriginal.png';
import pfpStylised from './pfpStylisedDarker.png';

type PfpPropT = {
    stylised: boolean;
};

export const Pfp: React.FC<PfpPropT> = ({stylised}: PfpPropT) => {
    const [isStylised, setStylised] = useState(stylised);
    return (
        <div className="stack">
            <img className="rounded bordered" src={isStylised ? pfpStylised : pfpOriginal} style={{width: 320, height: 320}}/>
            <div className="box" style={{"justifyContent": "flex-start", "alignItems": "start"}} onClick={() => setStylised(!isStylised)}>
                <Icon icon={isStylised ? "visibility" : "visibility_off"} className="rounded hover bordered" style={{"fontSize": "xx-large"}}/>
            </div>
        </div>
    );
};

export default Pfp;