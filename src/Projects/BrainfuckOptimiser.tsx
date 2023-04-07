import React, { useEffect, useRef, useState } from 'react';
import brainfuck_optimiser_init, { async_wasm_repl, init_panic_hook } from 'brainfuck-optimiser-wasm-bindgen';
import Icon from '../MaterialIcons';
import Nugget from '../Nugget';

var is_init = false;

function init() {
    if (is_init) return;
    brainfuck_optimiser_init();
    is_init = true;
}

async function repl(
    readln: (s: string) => Promise<string>,
    writeln: (s: string) => void,
    write_errln: (s: string) => void,
    display_help: (s: string) => void,
    get: (i: number) => number,
    set: (i: number, x: number) => void,
    ask: () => Promise<number>,
    put: (x: number) => void,
    clear: () => void
) {
    await async_wasm_repl(
        readln,
        writeln,
        write_errln,
        display_help,
        get,
        set,
        ask,
        put,
        clear
    );
}

export const BrainfuckOptimiser: React.FC<{}> = (props: {}) => { 
    useEffect(init, []);

    const [inactive, setInactive] = useState(true);
    const [history, setHistory] = useState<JSX.Element[]>([]);
    const [asking, setAsking] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="padded col" style={{alignItems: "start"}}>
            <h1>
                Brainfuck Optimiser
            </h1>
            { inactive ?
                <div className="padded row hover action" style={{alignSelf: "center"}} onClick={async () => {
                    init_panic_hook();
                    setInactive(false);

                    var state = {
                        head: 0,
                        memory: {} as {[key: number]: number}
                    };

                    await repl(
                        s => new Promise(res => {
                            const inputbox = inputRef.current as HTMLInputElement;
                            inputbox.disabled = false;
                            inputbox.onkeydown = event => {
                                if (event.key === 'Enter') {
                                    const txt = inputbox.value;
                                    inputbox.value = "";
                                    inputbox.disabled = true;
                                    setHistory(h => [...h, <PreviousCommand input={txt} />])
                                    res(txt);
                                }
                            };
                        }), // readln
                        s => setHistory(h => [...h, <p>{s}</p>]), // writeln
                        s => setHistory(h => [...h, <ErrorMessage msg={s} />]), // write_errln
                        () => setHistory(h => [...h, <HelpText />]), // display_help
                        i => state.memory[Math.round(i)] || 0, // get
                        (i, x) => { state.memory[Math.round(i)] = Math.round(x); }, // set 
                        () => new Promise(res => {
                            const inputbox = inputRef.current as HTMLInputElement;
                            setAsking(true);
                            inputbox.disabled = false;
                            inputbox.onkeydown = event => {
                                if (event.key === 'Enter' && inputbox.validity.valid && inputbox.value) {
                                    const txt = inputbox.value;
                                    const n = (new Number(txt)).valueOf();
                                    inputbox.value = "";
                                    inputbox.disabled = true;
                                    setAsking(false);
                                    setHistory(h => [...h, <Ask input={txt} />])
                                    res(n);
                                }
                            };
                        }), // ask
                        x => setHistory(h => [...h, <Put val={Math.round(x)} />]), // put
                        () => state.memory = {} // clear
                    );

                    setHistory([]);
                    setInactive(true);
                }}>
                    <Icon icontype="material-symbols-outlined" icon="terminal" />&#160;<p>Start</p>
                </div> :
                <>
                    <p>
                        Type <span className="action">:h</span> for help!
                    </p>
                    <Nugget />
                    { history }
                    <div className="row" style={{alignSelf: "stretch"}}>
                        {
                            asking ?
                                <>
                                    <Icon icon="arrow_left" icontype="material-symbols-outlined"/>&#160;
                                        <input type="text" required={true} pattern="(0*(1[0-9][0-9]|2([0-4][0-9]|5[0-5])|[0-9][0-9]|[0-9])|0+)" className="open" ref={inputRef}>
                                        </input>
                                </> :
                                <>
                                    <Icon className="action" icon="start" icontype="material-symbols-outlined"/>&#160;
                                        <input type="text" className="boxed" ref={inputRef}>
                                        </input>
                                </>
                        }
                    </div>
                </>
            }
        </div>
    );
}

const PreviousCommand: React.FC<{input: string}> = (props) =>
    <div className="row" style={{alignSelf: "stretch"}}>
        <Icon className="action" icon="arrow_right_alt" icontype="material-symbols-outlined"/>&#160;
        <input type="text" readOnly={true} className="open action-gradient" value={props.input}>
        </input>
    </div>

const ErrorMessage: React.FC<{msg: string}> = (props) =>
    <>
        <div className="highlight-gradient">
            { props.msg.split(/\r?\n/).map((line, index) => <p key={index}>{line}</p>) }
        </div>
        <Nugget />
    </>;

const Ask: React.FC<{input: string}> = (props) =>
    <div className="row" style={{alignSelf: "stretch"}}>
        <Icon icon="arrow_left" icontype="material-symbols-outlined"/>&#160;
        <input type="text" readOnly={true} className="open" value={props.input}>
        </input>
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