use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::*;
use brainfuck_optimiser::optimised::*;

#[wasm_bindgen]
pub fn init_panic_hook()
    -> ()
{
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn wasm_repl(
    readln: js_sys::Function,
    writeln: js_sys::Function,
    write_errln: js_sys::Function,
    display_help: js_sys::Function,
    get: js_sys::Function,
    set: js_sys::Function,
    ask: js_sys::Function,
    put: js_sys::Function,
    clear: js_sys::Function
)
    -> ()
{
    use brainfuck_optimiser::{repl::*, interpreter::*};

    let mut ci = ConsoleInteractor{
        readln: |s: String| readln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap().as_string().unwrap(),
        writeln: |s: String| { writeln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap(); },
        write_errln: |s: String| { write_errln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap(); },
        display_help: || { display_help.call0(& JsValue::NULL).unwrap(); }
    };
    let mut bfctx = BFCtx{
        index: 0,
        get: |i: i32| get.call1(& JsValue::NULL, & JsValue::from(i)).unwrap().as_f64().unwrap() as u8,
        set: |i: i32, x: u8| { set.call2(& JsValue::NULL, & JsValue::from(i), & JsValue::from(x)).unwrap(); },
        ask: || ask.call0(& JsValue::NULL).unwrap().as_f64().unwrap() as u8,
        put: |x: u8| { put.call1(& JsValue::NULL, & JsValue::from(x)).unwrap(); },
        clear: || { clear.call0(& JsValue::NULL).unwrap(); }
    };
    while rep(&mut ci, &mut bfctx) {};
}

#[wasm_bindgen]
pub async fn async_wasm_repl(
    readln: js_sys::Function,
    writeln: js_sys::Function,
    write_errln: js_sys::Function,
    display_help: js_sys::Function,
    get: js_sys::Function,
    set: js_sys::Function,
    ask: js_sys::Function,
    put: js_sys::Function,
    clear: js_sys::Function
)
    -> ()
{
    use brainfuck_optimiser::{repl::*, interpreter::*};

    let mut ci = AsyncConsoleInteractor{
        readln: |s: String| async {
            let promise = js_sys::Promise::from(readln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap());
            let future = JsFuture::from(promise);
            future.await.unwrap().as_string().unwrap()
        },
        writeln: |s: String| { writeln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap(); },
        write_errln: |s: String| { write_errln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap(); },
        display_help: || { display_help.call0(& JsValue::NULL).unwrap(); }
    };
    let mut bfctx = AsyncBFCtx{
        index: 0,
        get: |i: i32| get.call1(& JsValue::NULL, & JsValue::from(i)).unwrap().as_f64().unwrap() as u8,
        set: |i: i32, x: u8| { set.call2(& JsValue::NULL, & JsValue::from(i), & JsValue::from(x)).unwrap(); },
        ask: || async {
            let promise = js_sys::Promise::from(ask.call0(& JsValue::NULL).unwrap());
            let future = JsFuture::from(promise);
            future.await.unwrap().as_f64().unwrap() as u8
        },
        put: |x: u8| { put.call1(& JsValue::NULL, & JsValue::from(x)).unwrap(); },
        clear: || { clear.call0(& JsValue::NULL).unwrap(); }
    };
    while async_rep(&mut ci, &mut bfctx).await {};
}

#[wasm_bindgen]
pub fn optimised_wasm_repl(
    readln: js_sys::Function,
    writeln: js_sys::Function,
    write_errln: js_sys::Function,
    display_help: js_sys::Function,
    display_optimisation: js_sys::Function,
    get: js_sys::Function,
    set: js_sys::Function,
    ask: js_sys::Function,
    put: js_sys::Function,
    clear: js_sys::Function
)
    -> ()
{
    use brainfuck_optimiser::optimised::{repl::*, interpreter::*};

    let mut ci = ConsoleInteractor{
        readln: |s: String| readln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap().as_string().unwrap(),
        writeln: |s: String| { writeln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap(); },
        write_errln: |s: String| { write_errln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap(); },
        display_help: || { display_help.call0(& JsValue::NULL).unwrap(); },
        display_optimisation: |bs: & Vec<OptimisedBlock>| { display_optimisation.call1(& JsValue::NULL, & JsValue::from(byte_code_pretty(bs))).unwrap(); }
    };
    let mut bfctx = BFCtx{
        index: 0,
        get: |i: i32| get.call1(& JsValue::NULL, & JsValue::from(i)).unwrap().as_f64().unwrap() as u8,
        set: |i: i32, x: u8| { set.call2(& JsValue::NULL, & JsValue::from(i), & JsValue::from(x)).unwrap(); },
        ask: || ask.call0(& JsValue::NULL).unwrap().as_f64().unwrap() as u8,
        put: |x: u8| { put.call1(& JsValue::NULL, & JsValue::from(x)).unwrap(); },
        clear: || { clear.call0(& JsValue::NULL).unwrap(); }
    };
    while rep(&mut ci, &mut bfctx) {};
}

#[wasm_bindgen]
pub async fn async_optimised_wasm_repl(
    readln: js_sys::Function,
    writeln: js_sys::Function,
    write_errln: js_sys::Function,
    display_help: js_sys::Function,
    display_optimisation: js_sys::Function,
    get: js_sys::Function,
    set: js_sys::Function,
    ask: js_sys::Function,
    put: js_sys::Function,
    clear: js_sys::Function
)
    -> ()
{
    use brainfuck_optimiser::optimised::{repl::*, interpreter::*};

    let mut ci = AsyncConsoleInteractor{
        readln: |s: String| async {
            let promise = js_sys::Promise::from(readln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap());
            let future = JsFuture::from(promise);
            future.await.unwrap().as_string().unwrap()
        },
        writeln: |s: String| { writeln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap(); },
        write_errln: |s: String| { write_errln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap(); },
        display_help: || { display_help.call0(& JsValue::NULL).unwrap(); },
        display_optimisation: |bs: & Vec<OptimisedBlock>| { display_optimisation.call1(& JsValue::NULL, & JsValue::from(byte_code_pretty(bs))).unwrap(); }
    };
    let mut bfctx = AsyncBFCtx{
        index: 0,
        get: |i: i32| get.call1(& JsValue::NULL, & JsValue::from(i)).unwrap().as_f64().unwrap() as u8,
        set: |i: i32, x: u8| { set.call2(& JsValue::NULL, & JsValue::from(i), & JsValue::from(x)).unwrap(); },
        ask: || async {
            let promise = js_sys::Promise::from(ask.call0(& JsValue::NULL).unwrap());
            let future = JsFuture::from(promise);
            future.await.unwrap().as_f64().unwrap() as u8
        },
        put: |x: u8| { put.call1(& JsValue::NULL, & JsValue::from(x)).unwrap(); },
        clear: || { clear.call0(& JsValue::NULL).unwrap(); }
    };
    while async_rep(&mut ci, &mut bfctx).await {};
}