import React, { CSSProperties, ReactNode, useCallback, useEffect, useRef, useState } from "react";

export type SemiRegular = {
    style?: CSSProperties;
    className?: string;
};

export type Regular = SemiRegular & {
    children?: ReactNode | ReactNode[];
};

export const normChildren = (children: undefined | ReactNode | ReactNode[]): ReactNode[] =>
    (children !== undefined) ? [children].flat() : [];

export const normStyle = (style: undefined | CSSProperties): CSSProperties =>
    (style !== undefined) ? style : {} as CSSProperties;

export const normClassName = (className: undefined | string): string =>
    (className !== undefined) ? className : "";

