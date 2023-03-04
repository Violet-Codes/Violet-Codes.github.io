import { CSSProperties, ReactNode } from "react";

export type SemiRegular = {
    style?: CSSProperties;
    className?: string;
};

export type Regular = SemiRegular & {
    children?: ReactNode | ReactNode[];
};

export const normChildren = (props: Regular): ReactNode[] =>
    (props.children !== undefined) ? [props.children].flat() : [];

export const normStyle = (props: SemiRegular): CSSProperties =>
    (props.style !== undefined) ? props.style : {} as CSSProperties;

export const normClassName = (props: SemiRegular): string =>
    (props.className !== undefined) ? props.className : "";