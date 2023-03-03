import React from 'react';
import pfpOriginal from'./pfpOriginal.png';
import pfpStylised from'./pfpStylised.png';

type PropT = {stylised: boolean};

export const Pfp: React.FC<PropT> = (props: PropT) => {
    const {stylised} = props;
    if (stylised) {
        return (
            <img
                src={pfpStylised}
                className='img-thumbnail img-fluid'
            />
        );
    } else {
        return (
            <img
                src={pfpOriginal}
                className='img-thumbnail img-fluid'
            />
        );

    }
};

export default Pfp;