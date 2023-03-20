import React from 'react';

import { SemiRegular, normClassName } from './Util';

type IconPropT = SemiRegular & {
    icon: string;
};

export const Icon: React.FC<IconPropT> = ({className, style, icon}: IconPropT) =>
    <span className={`material-icons ${normClassName(className)}`.trim()} style={style}>
        {icon}
    </span>;

export default Icon;