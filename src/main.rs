use boa_engine::{Context, JsValue};

fn main() {
    let js_code = r#"console.log("Hello World from a JS code string!")"#;

    let mut ctx = Context::default();

    let stmts = ctx.parse(js_code).unwrap();
    let code_block = ctx.compile(&stmts).unwrap();

    match ctx.execute(code_block) {
        Ok(res) if !res.is_undefined() => {
            println!("{}", JsValue::to_json(&res, &mut ctx).unwrap());
        }
        Ok(_) => {
            println!("undefined");
        }
        Err(e) => {
            eprintln!("Uncaught {}", e.display());
        }
    }
}
