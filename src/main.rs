use boa_engine::property::Attribute;
use boa_engine::{
    builtins::JsArgs,
    class::{Class, ClassBuilder},
    Context, JsResult, JsValue,
};
use boa_gc::{Finalize, Trace};

#[derive(Debug, Trace, Finalize)]
struct Person {
    name: String,
    age: u8,
}

fn main() {
    let js_code = r#"
        console.log("Hello World from a JS code string!");
        console.log(PROJECT_VERSION);
        let person = new Person("Mathias", 38);
        person.say_hello();
        PROJECT_VERSION
    "#;

    let mut ctx = Context::default();

    ctx.register_global_class::<Person>()
        .expect("could not register class");
    ctx.register_global_property("PROJECT_VERSION", "1.0.0", Attribute::default());

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
