// https://boa-dev.github.io/posts/2022-10-24-boa-usage/

use boa_engine::{
    builtins::JsArgs,
    class::{Class, ClassBuilder},
    object::JsArray,
    property::Attribute,
    Context, JsResult, JsValue,
};
use boa_gc::{Finalize, Trace};

#[derive(Debug, Trace, Finalize)]
struct Person {
    name: String,
    age: u8,
}

fn main() {
    let js_path = std::env::args()
        .nth(1)
        .unwrap_or_else(|| "bundle.js".to_string());
    let js_code = std::fs::read_to_string(js_path).unwrap();

    let mut ctx = Context::default();

    ctx.register_global_class::<Person>()
        .expect("could not register class");
    ctx.register_global_property("PROJECT_VERSION", "1.0.0", Attribute::default());
    ctx.register_global_builtin_function("reverseAppend", 1, reverse_append);

    match ctx.eval(&js_code) {
        Ok(res) if !res.is_undefined() => {
            println!(
                "Script returned: {}",
                JsValue::to_json(&res, &mut ctx).unwrap()
            );
        }
        Ok(_) => {
            println!("Script returned: undefined");
        }
        Err(e) => {
            eprintln!("Uncaught {}", e.display());
        }
    }
}

impl Person {
    fn say_hello(this: &JsValue, _args: &[JsValue], ctx: &mut Context) -> JsResult<JsValue> {
        let this = this
            .as_object()
            .and_then(|obj| obj.downcast_ref::<Self>())
            .ok_or_else(|| ctx.construct_type_error("`this` is not a `Person`"))?;

        println!("Hello {}-year-old {}!", this.age, this.name);

        Ok(JsValue::undefined())
    }
}

impl Class for Person {
    const NAME: &'static str = "Person";
    const LENGTH: usize = 2;

    fn constructor(_this: &JsValue, args: &[JsValue], ctx: &mut Context) -> JsResult<Self> {
        let name = args.get_or_undefined(0).to_string(ctx)?;
        let age = args.get_or_undefined(1).to_u32(ctx)?;

        if !(0..=150).contains(&age) {
            ctx.throw_range_error(format!("invalid age `{age}`. Must be between 0 and 150"))?;
        }

        let age = u8::try_from(age).expect("we already checked that it was in range");

        let person = Person {
            name: name.to_string(),
            age,
        };

        Ok(person)
    }

    fn init(class: &mut ClassBuilder) -> JsResult<()> {
        class.method("say_hello", 0, Self::say_hello);

        Ok(())
    }
}

fn reverse_append(_this: &JsValue, args: &[JsValue], ctx: &mut Context) -> JsResult<JsValue> {
    let arr = args
        .get_or_undefined(0)
        .as_object()
        .ok_or_else(|| ctx.construct_type_error("argument must be an array"))?;

    let arr = JsArray::from_object(arr.clone(), ctx)?;

    let reverse = arr.reverse(ctx)?;
    reverse.push("My Project", ctx)?;

    let global_object = ctx.global_object().clone();
    let version = global_object
        .get("PROJECT_VERSION", ctx)
        .unwrap_or_default();

    reverse.push(version, ctx)?;

    Ok(reverse.into())
}
