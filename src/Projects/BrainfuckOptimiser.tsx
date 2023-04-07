import React, { useEffect, useRef, useState } from 'react';
import brainfuck_optimiser_init, { wasm_rep } from 'brainfuck-optimiser-wasm-bindgen';
import Icon from '../MaterialIcons';
import Nugget from '../Nugget';

var is_init = false;

function init() {
    if (is_init) return;
    brainfuck_optimiser_init();
    is_init = true;
}

function rep(
    readln: (s: string) => string,
    writeln: (s: string) => void,
    write_errln: (s: string) => void,
    display_help: (s: string) => void,
    index: number,
    get: (i: number) => number,
    set: (i: number, x: number) => void,
    ask: () => number,
    put: (x: number) => void,
    clear: () => void
) {
    return wasm_rep(
        readln,
        writeln,
        write_errln,
        display_help,
        index,
        get,
        set,
        ask,
        put,
        clear
    );
}

interface BFState{
    index: number;
    memory: {
        [key: number]: number
    }
}

export const BrainfuckOptimiser: React.FC<{}> = (props: {}) => { 
    useEffect(init, []);
    const [bfState, setBfState] = useState<BFState>({index: 0, memory: {}});
    const [state, setState] = useState<{history: JSX.Element[], user_interact: boolean}>({history: [], user_interact: true});

    function append_history(elem: JSX.Element) {
        state.history = [...state.history, elem];
        setState({...state});
    }

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
            { state.history }
            <div className="row" style={{alignSelf: "stretch"}}>
                <Icon className="action" icon="start" icontype="material-symbols-outlined"/>&#160;
                <input ref={ref} disabled={!state.user_interact} onKeyDown={async event => {
                    if (event.key === 'Enter') {
                        const cur = ref.current as HTMLInputElement;
                        const txt = cur.value;
                        cur.value = "";

                        state.history = [...state.history, <PreviousCommand input={txt as string} />];
                        state.user_interact = false;
                        setState({...state});

                        bfState.index = rep(
                            s => txt, // readln
                            s => append_history(<p>{s}</p>), // writeln
                            s => append_history(<FailedCommand msg={s} />), // write_errln
                            () => append_history(<HelpText />), // display_help
                            bfState.index,
                            i => bfState.memory[Math.round(i)] || 0, // get
                            (i, x) => { bfState.memory[Math.round(i)] = Math.round(x); }, // set
                            () => {
                                const n = Math.round(Number(prompt("input")));
                                append_history(<Ask val={n} />);
                                return n;
                            }, // ask
                            x => append_history(<Put val={Math.round(x)} />), // put
                            () => bfState.memory = {} // clear
                        );
                        setBfState({index: bfState.index, memory: {...bfState.memory}});

                        state.user_interact = true;
                        setState({...state});
                    }
                }}>
                </input>
            </div>
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

const FailedCommand: React.FC<{msg: string}> = (props) =>
    <>
        <div className="highlight-gradient">
            { props.msg.split(/\r?\n/).map((line, index) => <p key={index}>{line}</p>) }
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
        <div className="col" style={{alignItems: "stretch"}}>
            <div className="row" style={{justifyContent: "space-between"}}>
                <p>
                    <span className="action">:q</span>
                </p>
                <Nugget />
                <p>
                    quits
                </p>
            </div>
            <div className="row" style={{justifyContent: "space-between"}}>
                <p>
                    <span className="action">:r</span> &#60;<span className="highlight">register</span>&#62;
                </p>
                <Nugget />
                <p>
                    displays the contents of the given register
                </p>
            </div>
            <div className="row" style={{justifyContent: "space-between"}}>
                <p>
                    <span className="action">:c</span>
                </p>
                <Nugget />
                <p>
                    clears all registers
                </p>
            </div>
            <div className="row" style={{justifyContent: "space-between"}}>
                <p>
                    <span className="action">:h</span>
                </p>
                <Nugget />
                <p>
                    displays the help text
                </p>
            </div>
            <div className="row" style={{justifyContent: "space-between"}}>
                <p>
                    <span className="action">:f</span>
                </p>
                <Nugget />
                <p>
                    finds the register of the head
                </p>
            </div>
            <div className="row" style={{justifyContent: "space-between"}}>
                <p>
                    <span className="action">:m</span> &#60;<span className="highlight">register</span>&#62;
                </p>
                <Nugget />
                <p>
                    moves the head to a specific register
                </p>
            </div>
            <div className="row" style={{justifyContent: "space-between"}}>
                <p>
                    &#60;<span className="highlight">input</span>&#62;
                </p>
                <Nugget />
                <p>
                    runs the brainfuck code
                </p>
            </div>
        </div>
        <Nugget />
    </>;

export default BrainfuckOptimiser;