import React, { useEffect, useRef, useState } from 'react';
import brainfuck_optimiser_init, {} from 'brainfuck-optimiser-wasm-bindgen';
import Icon from '../MaterialIcons';
import Nugget from '../Nugget';

var is_init = false;

function init() {
    if (is_init) return;
    brainfuck_optimiser_init();
    is_init = true;
}

export const BrainfuckOptimiser: React.FC<{}> = (props: {}) => { 
    useEffect(init, []);
    const [inREPL, setInREPL] = useState(true);
    const [history, setHistory] = useState<JSX.Element[]>([]);
    const ref = useRef<HTMLInputElement>(null);
    return (
        <div className="padded col" style={{alignItems: "start"}}>
            <h1>
                Brainfuck Optimiser
            </h1>
            <p>
                Type <span className="action">:h</span> for help!
            </p>
            <Nugget />
            <FailedCommand input="abc" msg={"bad\ncode"} />
            <PreviousCommand input="abc" />
            <Ask val={32} />
            <Put val={32} />
            { history }
            { inREPL && <div className="row" style={{alignSelf: "stretch"}}>
                <Icon className="action" icon="start" icontype="material-symbols-outlined"/>&#160;
                <input ref={ref} disabled={false} onKeyDown={event => {
                    if (event.key === 'Enter') {
                        const cur = ref.current as HTMLInputElement
                        const s = cur.value
                        cur.value = "";
                        setHistory([...history, <PreviousCommand input={s as string} />])
                    }
                }}>
                </input>
            </div> }
        </div>
    );
}

const PreviousCommand: React.FC<{input: string}> = (props) => 
    <div className="row">
        <Icon className="action" icon="arrow_right_alt" icontype="material-symbols-outlined"/>&#160;
        <p className="action-gradient">
            {props.input}
        </p>
    </div>;

const FailedCommand: React.FC<{input: string, msg: string}> = (props) =>
    <>
        <div className="row">
            <Icon className="highlight" icon="error" icontype="material-symbols-outlined"/>&#160;
            <p className="highlight">
                {props.input}
            </p>
        </div>
        <div className="highlight">
            { props.msg.split(/\r?\n/).map(line => <p>{line}</p>) }
        </div>
        <Nugget />
    </>;

const Ask: React.FC<{val: number}> = (props) =>
    <div className="row">
        <Icon icon="arrow_left" icontype="material-symbols-outlined"/>&#160;
        <p>
            {props.val}
        </p>
    </div>;

const Put: React.FC<{val: number}> = (props) =>
    <div className="row">
        <Icon icon="arrow_right" icontype="material-symbols-outlined"/>&#160;
        <p>
            {props.val}
        </p>
    </div>;

const HelpText: React.FC<{}> = (props) =>
    <>
        <Nugget />
        <p>
            HelpText
        </p>
        <Nugget />
    </>;

export default BrainfuckOptimiser;