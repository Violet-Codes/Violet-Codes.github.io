import React, { useState, ReactNode } from 'react';

type DropdownPropT = {
    Controller: React.FC<{callback: () => void, isVisible: boolean}>;
    children?: ReactNode | ReactNode[];
    visible?: boolean;
};

export const Dropdown: React.FC<DropdownPropT> = ({Controller, children, visible}: DropdownPropT) => {
    const [isVisible, setVisibility] = useState(visible || false);
    return (
        <>
            <Controller callback={() => setVisibility(!isVisible)} isVisible={isVisible}/>
            { isVisible && children }
        </>
    );
};

export default Dropdown;