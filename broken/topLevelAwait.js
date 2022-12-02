// cargo run -- broken/topLevelAwait.js

async function f1() {
  console.log("promise 1 resolved");
}

function sleep(ms) {
  return new Promise((resolve) => {
    console.log("sleeping");
    setTimeout(resolve, ms);
  });
}

// This won't print "promise 2 resolved"
async function main() {
  await f1();
  await sleep();
  await new Promise(() => console.log("promise 2 resolved"));
}
main();

await f1();
await new Promise(() => console.log("promise 3 resolved"));
// This crashes
// thread 'main' panicked at 'Assertion: <handlerResult is not an abrupt completion> failed', /Users/mathias/.cargo/registry/src/github.com-1ecc6299db9ec823/boa_engine-0.16.0/src/builtins/promise/promise_job.rs:66:25
// await sleep(1000);
