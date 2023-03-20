import React from 'react';
import { SemiRegular, normClassName } from './Util';

export const Nugget: React.FC<SemiRegular> = ({className, style}: SemiRegular) =>
    <div className={`nugget ${normClassName(className)}`.trim()} style={style}>

    </div>;

export default Nugget;