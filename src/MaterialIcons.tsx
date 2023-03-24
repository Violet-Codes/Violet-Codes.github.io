import React from 'react';

import { SemiRegular, normClassName } from './Util';

type IconPropT = SemiRegular & {
    icon: string;
    icontype?: "material-icons" | "material-symbols-outlined";
    onClick?: React.MouseEventHandler<HTMLSpanElement>;
};

export const Icon: React.FC<IconPropT> = ({className, style, icon, icontype, onClick}: IconPropT) =>
    <span className={`${icontype ? icontype : "material-icons"} ${normClassName(className)}`.trim()} style={style} onClick={onClick}>
        {icon}
    </span>;

export default Icon;