import React, { useState } from 'react';

import Image from './Image';
import Icon from './MaterialIcons';

import pfpOriginal from './pfpOriginal.png';
import pfpStylised from './pfpStylisedDarker.png';

type PfpPropT = {
    stylised: boolean;
};

export const Pfp: React.FC<PfpPropT> = (props: PfpPropT) => {
    const [stylised, setStylised] = useState(props.stylised);
    return (
        <div className="stack">
            <Image className="rounded bordered" url={stylised ? pfpStylised : pfpOriginal} width={320} height={320}/>
            <div className="box" style={{"justifyContent": "flex-start", "alignItems": "start"}} onClick={() => setStylised(!stylised)}>
                <Icon icon={stylised ? "visibility" : "visibility_off"} className="rounded hover bordered" style={{"fontSize": "xx-large"}}/>
            </div>
        </div>
    );
};

export default Pfp;