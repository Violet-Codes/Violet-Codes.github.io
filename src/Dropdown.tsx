import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useMeasure } from 'react-use';
import { Regular, normChildren, normStyle } from './Util';

type DropdownPropT = Regular & {
    Controller: React.FC<{callback: () => void, isVisible: boolean}>;
    visible?: boolean;
};

export const Dropdown: React.FC<DropdownPropT> = ({Controller, children, className, style, visible}: DropdownPropT) => {
    const [measureRef, dims] = useMeasure<HTMLDivElement>();
    const [isVisible, setVisibility] = useState(visible || false);
    const css = useSpring({
        from: {
            ...normStyle(style),
            ...(visible ? { height: dims.height, width: dims.width } : { height: 0, width: 0 }),
            overflow: "hidden"
        },
        to: isVisible ? { height: dims.height, width: dims.width } : { height: 0, width: 0 }
    });
    return (
        <>
            <Controller callback={() => setVisibility(!isVisible)} isVisible={isVisible}/>
            <animated.div className={className} style={css}>
                <div ref={measureRef} style={{width: "fit-content", height: "fit-content"}}>
                    { normChildren(children) }
                </div>
            </animated.div>
        </>
    );
};

export default Dropdown;