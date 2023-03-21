import React from 'react';

import { SemiRegular, normClassName } from './Util';

type IconPropT = SemiRegular & {
    icon: string;
    onClick?: React.MouseEventHandler<HTMLSpanElement>;
};

export const Icon: React.FC<IconPropT> = ({className, style, icon, onClick}: IconPropT) =>
    <span className={`material-icons ${normClassName(className)}`.trim()} style={style} onClick={onClick}>
        {icon}
    </span>;

export default Icon;