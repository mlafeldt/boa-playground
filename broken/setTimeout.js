// cargo run -- broken/setTimeout.js
// Expected: 🤡 lurks in the shadows <-- after 1 second
// Got: no output
// From https://www.digitalocean.com/community/tutorials/js-async-functions

function who() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("🤡");
    }, 200);
  });
}

function what() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("lurks");
    }, 300);
  });
}

function where() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("in the shadows");
    }, 500);
  });
}

async function msg() {
  // const [a, b, c] = await Promise.all([who(), what(), where()]);
  const a = await who();
  const b = await what();
  const c = await where();

  console.log(`${a} ${b} ${c}`);
}

msg();
