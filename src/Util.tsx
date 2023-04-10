import React, { CSSProperties, ReactNode } from "react";
import { animated, useSpring } from "react-spring";
import { useMeasure } from "react-use";

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

export const ScrollRow: React.FC<Regular> = (props) => {
    const [measureRef, dims] = useMeasure<HTMLDivElement>();
    const css = useSpring({
        from: {
            ...normStyle(props.style),
            width: 0,
            overflow: "auto",
            justifyContent: "start"
        },
        to: {
            width: dims.width
        }
    });
    return (
        <div className="col" style={{alignSelf: "stretch"}}>
            <div ref={measureRef} style={{alignSelf: "stretch"}}/>
            <animated.div className={`row ${normClassName(props.className)}`.trim()} style={css}>
                {props.children}
            </animated.div>
        </div>
    );
}