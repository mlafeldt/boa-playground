use boa_engine::property::Attribute;
use boa_engine::{builtins::JsArgs, Context, JsResult, JsValue};

fn main() {
    let js_code = r#"
        console.log("Hello World from a JS code string!");
        say_hello(PROJECT_VERSION);
        PROJECT_VERSION = "0.0.1";
    "#;

    let mut ctx = Context::default();

    ctx.register_global_builtin_function("say_hello", 1, say_hello);
    ctx.register_global_property("PROJECT_VERSION", "1.0.0", Attribute::READONLY);

    // let stmts = ctx.parse(js_code).unwrap();
    // let code_block = ctx.compile(&stmts).unwrap();
    // ctx.execute(code_block.clone())

    match ctx.eval(&js_code) {
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

fn say_hello(_this: &JsValue, args: &[JsValue], ctx: &mut Context) -> JsResult<JsValue> {
    let name = args.get_or_undefined(0);

    if name.is_undefined() {
        println!("Hello World!");
    } else {
        println!("Hello {}!", name.to_string(ctx)?);
    }

    Ok(JsValue::undefined())
}
