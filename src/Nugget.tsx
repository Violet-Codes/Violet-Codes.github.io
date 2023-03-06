import React from 'react';
import { SemiRegular, normClassName } from './Util';

export const Nugget: React.FC<SemiRegular> = (props: SemiRegular) =>
    <div className={`nugget ${normClassName(props)}`.trim()} style={props.style}>

    </div>;

export default Nugget;