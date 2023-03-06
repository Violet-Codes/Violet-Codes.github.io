import React from 'react';

import { SemiRegular, normClassName } from './Util';

type IconPropT = SemiRegular & {
    icon: string;
};

export const Icon: React.FC<IconPropT> = (props: IconPropT) =>
    <span className={`material-icons ${normClassName(props)}`.trim()} style={props.style}>
        {props.icon}
    </span>;

export default Icon;