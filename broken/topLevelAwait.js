// cargo run -- broken/topLevelAwait.js
// Got: Uncaught SyntaxError: expected token ';', got 'f1' in expression statement at line 23, col 7

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
await Promise.resolve(console.log("promise 2 resolved"));
await sleep(1000);
