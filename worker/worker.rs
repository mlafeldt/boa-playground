use worker::*;

#[event(fetch)]
pub async fn main(mut req: Request, _env: Env, _ctx: Context) -> Result<Response> {
    let js_code = req.text().await?;

    console_log!("Code to run: {js_code}");

    let mut ctx = boa_engine::Context::default();

    match ctx.eval(js_code) {
        Ok(res) => {
            let res = res.to_string(&mut ctx).unwrap().to_string();
            console_log!("Result: {res}");
            Response::ok(res)
        }
        Err(err) => {
            let msg = format!("Uncaught: {}", err.display());
            console_log!("{msg}");
            Response::error(msg, 500)
        }
    }
}
