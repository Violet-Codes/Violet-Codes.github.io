import React, { useEffect, useRef, useState } from 'react';
import brainfuck_optimiser_init, { async_optimised_wasm_repl, async_wasm_repl, init_panic_hook } from 'brainfuck-optimiser-wasm-bindgen';
import Icon from '../MaterialIcons';
import Nugget from '../Nugget';
import { useMeasure } from 'react-use';
import { animated, useSpring } from 'react-spring';
import Dropdown from '../Dropdown';

var is_init = false;

function init() {
    if (is_init) return;
    brainfuck_optimiser_init();
    is_init = true;
}

async function optimised_repl(
    readln: (s: string) => Promise<string>,
    writeln: (s: string) => void,
    write_errln: (s: string) => void,
    display_help: (s: string) => void,
    display_optimisation: (s: string) => void,
    get: (i: number) => number,
    set: (i: number, x: number) => void,
    ask: () => Promise<number>,
    put: (x: number) => void,
    clear: () => void
) {
    await async_optimised_wasm_repl(
        readln,
        writeln,
        write_errln,
        display_help,
        display_optimisation,
        get,
        set,
        ask,
        put,
        clear
    );
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

    const [displayAsNumber, setDisplayAsNumber] = useState(true);
    const [inactive, setInactive] = useState(true);
    const [history, setHistory] = useState<((b: boolean) => JSX.Element)[]>([]);
    const [asking, setAsking] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="padded col" style={{alignItems: "start"}}>
            <h1>
                Brainfuck Optimiser
            </h1>
            { inactive ?
                <div className="padded row hover action" style={{alignSelf: "start"}} onClick={async () => {
                    init_panic_hook();
                    setInactive(false);

                    var state = {
                        head: 0,
                        memory: {} as {[key: number]: number}
                    };

                    await optimised_repl(
                        s => new Promise(res => {
                            const inputbox = inputRef.current as HTMLInputElement;
                            inputbox.disabled = false;
                            inputbox.onkeydown = event => {
                                if (event.key === 'Enter') {
                                    const txt = inputbox.value;
                                    inputbox.value = "";
                                    inputbox.disabled = true;
                                    setHistory(h => [...h, dis => <PreviousCommand input={txt} />]);
                                    res(txt);
                                }
                            };
                        }), // readln
                        s => setHistory(h => [...h, dis => <p>{s}</p>]), // writeln
                        s => setHistory(h => [...h, dis => <ErrorMessage msg={s} />]), // write_errln
                        () => setHistory(h => [...h, dis => <HelpText />]), // display_help
                        bc => setHistory(h => [...h, bc.trim() ? dis => <OptimisedCode bytecode={bc} /> : dis => <></>]), // display_optimisation
                        i => state.memory[Math.round(i)] || 0, // get
                        (i, x) => { state.memory[Math.round(i)] = Math.round(x); }, // set 
                        () => new Promise(res => {
                            const inputbox = inputRef.current as HTMLInputElement;
                            setAsking(true);
                            inputbox.disabled = false;
                            inputbox.onkeydown = event => {
                                if (event.key === 'Enter' && inputbox.validity.valid && inputbox.value) {
                                    const dis = (() => {
                                        let m = undefined;
                                        setDisplayAsNumber(dis => { m = dis; return dis });
                                        return m;
                                    })();
                                    const txt = inputbox.value;
                                    const n = (() => {
                                        if (dis) {
                                            return (new Number(txt)).valueOf();
                                        } else {
                                            if (txt.length == 1) {
                                                return txt.codePointAt(0) as number;
                                            } else {
                                                return (new Number(txt.slice(1))).valueOf();
                                            }
                                        }
                                    })();
                                    inputbox.value = "";
                                    inputbox.disabled = true;
                                    setAsking(false);
                                    setHistory(h => [...h, dis => <Ask displayAsNumber={dis} val={n} />]);
                                    res(n);
                                }
                            };
                        }), // ask
                        x => setHistory(h => [...h, dis => <Put displayAsNumber={dis} val={Math.round(x)} />]), // put
                        () => state.memory = {} // clear
                    );

                    setHistory([]);
                    setInactive(true);
                }}>
                    <Icon icontype="material-symbols-outlined" icon="terminal" />&#160;<p>Start</p>
                </div> :
                <>
                    <div className="row" style={{justifyContent: "space-between", alignSelf: "stretch"}}>
                        <p>
                            Type <span className="action">:h</span> for help!
                        </p>
                        <div className="row">
                            <Icon icon="visibility" />
                            <p>
                                &#160;:&#160;
                            </p>
                            <Icon icon={displayAsNumber ? "123" : "abc"} className="rounded bordered hover action" icontype="material-symbols-outlined" style={{fontSize: "xx-large"}} onClick={() => setDisplayAsNumber(!displayAsNumber)} />
                        </div>
                    </div>
                    <Nugget />
                    { history.map(f => f(displayAsNumber)) }
                    <div className="row" style={{alignSelf: "stretch"}}>
                        {
                            asking ?
                                <>
                                    <Icon icon="arrow_left" icontype="material-symbols-outlined"/>&#160;
                                        <input type="text" pattern={
                                            displayAsNumber ?
                                            "0*(1[0-9][0-9]|2([0-4][0-9]|5[0-5])|[0-9][0-9]|[0-9])|0+" :
                                            "\\\\(0*(1[0-9][0-9]|2([0-4][0-9]|5[0-5])|[0-9][0-9]|[0-9])|0+)|[!-~]"
                                            } required={true} className="open" ref={inputRef}>
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

const OptimisedCode: React.FC<{bytecode: string}> = (props) => {
    const [measureRef, dims] = useMeasure<HTMLDivElement>();
    const css = useSpring({
        from: {
            width: 0,
            overflow: "auto",
            justifyContent: "start"
        },
        to: {
            width: dims.width
        }
    });
    return (
            <div className="col" style={{alignSelf: "stretch", alignItems: "start"}}>
                <div ref={measureRef} style={{alignSelf: "stretch"}}/>
                <Dropdown Controller={ (props) =>
                    <Icon icontype="material-symbols-outlined" icon={props.isVisible ? "code_off" : "code"} onClick={props.callback} />
                }>
                    <animated.div className="row action-gradient" style={css}>
                        <p style={{whiteSpace: "nowrap"}}>
                            <pre>{props.bytecode}</pre>
                        </p>
                    </animated.div>
                </Dropdown>
            </div>
    );
}

const ErrorMessage: React.FC<{msg: string}> = (props) =>
    <>
        <div className="highlight-gradient">
            { props.msg.split(/\r?\n/).map((line, index) => <p key={index}>{line}</p>) }
        </div>
        <Nugget />
    </>;

const Ask: React.FC<{val: number, displayAsNumber: boolean}> = (props) =>
    <div className="row">
        <Icon icon="arrow_left" icontype="material-symbols-outlined"/>&#160;
        <p>
            {props.displayAsNumber ? props.val : (33 <= props.val && props.val <= 261 ? String.fromCharCode(props.val) : `\\${props.val}`)}
        </p>
    </div>;

const Put: React.FC<{val: number, displayAsNumber: boolean}> = (props) =>
    <div className="row">
        <Icon icon="arrow_right" icontype="material-symbols-outlined"/>&#160;
        <p>
            {props.displayAsNumber ? props.val : (33 <= props.val && props.val <= 261 ? String.fromCharCode(props.val) : `\\${props.val}`)}
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