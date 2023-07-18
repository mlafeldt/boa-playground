use boa_engine::{
    class::{Class, ClassBuilder},
    object::builtins::JsArray,
    property::Attribute,
    Context, JsArgs, JsNativeError, JsResult, JsString, JsValue, NativeFunction, Source,
};
use boa_gc::{Finalize, Trace};
use boa_runtime::Console;

fn main() {
    let js_path = std::env::args().nth(1).unwrap_or_else(|| "bundle.js".to_string());
    let js_code = std::fs::read_to_string(js_path).unwrap();

    let mut ctx = Context::default();
    ctx.strict(true);

    let console = Console::init(&mut ctx);
    ctx.register_global_property(Console::NAME, console, Attribute::all())
        .expect("could not register console object");

    ctx.register_global_class::<Person>()
        .expect("could not register Person class");

    ctx.register_global_property("PROJECT_VERSION", "1.0.0", Attribute::default())
        .unwrap();
    ctx.register_global_builtin_callable("reverseAppend", 1, NativeFunction::from_fn_ptr(reverse_append))
        .unwrap();

    match ctx.eval(Source::from_bytes(&js_code)) {
        Ok(res) if !res.is_undefined() => {
            println!("Script returned: {}", JsValue::to_json(&res, &mut ctx).unwrap());
        }
        Ok(_) => {
            println!("Script returned: undefined");
        }
        Err(e) => {
            eprintln!("Uncaught {}", e);
        }
    }

    ctx.run_jobs();
}

#[derive(Debug, Trace, Finalize)]
struct Person {
    name: JsString,
    age: u32,
}

impl Person {
    fn say_hello(this: &JsValue, _args: &[JsValue], _ctx: &mut Context) -> JsResult<JsValue> {
        let this = this
            .as_object()
            .and_then(|obj| obj.downcast_ref::<Self>())
            .ok_or_else(|| JsNativeError::typ().with_message("`this` is not a `Person`"))?;

        println!("Hello {}-year-old {}!", this.age, this.name.to_std_string_escaped());

        Ok(JsValue::undefined())
    }
}

impl Class for Person {
    const NAME: &'static str = "Person";
    const LENGTH: usize = 2;

    fn constructor(_this: &JsValue, args: &[JsValue], ctx: &mut Context) -> JsResult<Self> {
        let name = args.get_or_undefined(0).to_string(ctx)?;
        let age = args.get(1).cloned().unwrap_or_default().to_u32(ctx)?;

        if !(0..=150).contains(&age) {
            return Err(JsNativeError::range()
                .with_message(format!("invalid age `{age}` - must be between 0 and 150"))
                .into());
        }

        Ok(Person { name, age })
    }

    fn init(class: &mut ClassBuilder) -> JsResult<()> {
        class.method("sayHello", 0, NativeFunction::from_fn_ptr(Self::say_hello));

        Ok(())
    }
}

fn reverse_append(_this: &JsValue, args: &[JsValue], ctx: &mut Context) -> JsResult<JsValue> {
    let arr = args
        .get_or_undefined(0)
        .as_object()
        .ok_or_else(|| JsNativeError::typ().with_message("argument must be an array"))?;

    let arr = JsArray::from_object(arr.clone())?;

    let reverse = arr.reverse(ctx)?;
    reverse.push("My Project", ctx)?;

    let global_object = ctx.global_object().clone();
    let version = global_object.get("PROJECT_VERSION", ctx).unwrap_or_default();

    reverse.push(version, ctx)?;

    Ok(reverse.into())
}
