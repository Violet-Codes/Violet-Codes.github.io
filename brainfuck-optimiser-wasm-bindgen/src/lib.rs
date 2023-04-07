use wasm_bindgen::prelude::*;
use brainfuck_optimiser::{repl::*, interpreter::BFCtx};

#[wasm_bindgen]
pub fn wasm_rep(
    readln: js_sys::Function,
    writeln: js_sys::Function,
    write_errln: js_sys::Function,
    display_help: js_sys::Function,
    index: i32,
    get: js_sys::Function,
    set: js_sys::Function,
    ask: js_sys::Function,
    put: js_sys::Function,
    clear: js_sys::Function
)
    -> i32
{
    let mut ci = ConsoleInteractor{
        readln: |s: String| readln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap().as_string().unwrap(),
        writeln: |s: String| { writeln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap(); },
        write_errln: |s: String| { write_errln.call1(& JsValue::NULL, & JsValue::from(s)).unwrap(); },
        display_help: || { display_help.call0(& JsValue::NULL).unwrap(); }
    };
    let mut bfctx = BFCtx{
        index,
        get: |i: i32| get.call1(& JsValue::NULL, & JsValue::from(i)).unwrap().as_f64().unwrap() as u8,
        set: |i: i32, x: u8| { set.call2(& JsValue::NULL, & JsValue::from(i), & JsValue::from(x)).unwrap(); },
        ask: || ask.call0(& JsValue::NULL).unwrap().as_f64().unwrap() as u8,
        put: |x: u8| { put.call1(& JsValue::NULL, & JsValue::from(x)).unwrap(); },
        clear: || { clear.call0(& JsValue::NULL).unwrap(); }
    };
    rep(&mut ci, &mut bfctx);
    bfctx.index
}