import React, { useEffect } from 'react';
import brainfuck_optimiser_init, {} from 'brainfuck-optimiser-wasm-bindgen';
import Icon from '../MaterialIcons';

var is_init = false;

function init() {
    if (is_init) return;
    brainfuck_optimiser_init();
    is_init = true;
}

export const BrainfuckOptimiser: React.FC<{}> = (props: {}) => {
    useEffect(init, []);
    return (
        <div className="padded">
            <h1>
                Brainfuck Optimiser
            </h1>
            <div className="row" style={{alignItems: "stretch"}}>
                <Icon className="action" icon="start" icontype="material-symbols-outlined"/>&#160;
                <input>
                </input>
            </div>
        </div>
    );
}

export default BrainfuckOptimiser;