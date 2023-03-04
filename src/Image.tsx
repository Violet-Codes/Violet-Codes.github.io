import React from 'react';
import { SemiRegular, normStyle } from './Util';

type ImagePropT = SemiRegular & {
    url: string;
    width?: number;
    height?: number;
};

export const Image: React.FC<ImagePropT> = (props: ImagePropT) =>
    <img className={props.className} style={{
        ...normStyle(props),
        "width": (props.width !== undefined) ? `${props.width}px` : "auto",
        "height": (props.height !== undefined) ? `${props.height}px` : "auto"
    }} src={props.url} />;

export default Image;