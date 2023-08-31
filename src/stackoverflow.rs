use boa_engine::{Context, Source};

fn main() {
    // This causes a stack overflow as the thread will be started with a 2MB stack by default.
    // See https://doc.rust-lang.org/std/thread/index.html#stack-size
    std::thread::spawn(|| {
        let mut ctx = Context::default();
        let code = Source::from_bytes(include_str!("../broken/ethers-5.7.2.umd.min.js"));
        ctx.eval(code).unwrap();
    })
    .join()
    .unwrap();
}
