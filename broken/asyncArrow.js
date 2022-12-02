// cargo run -- broken/asyncArrow.js
// Expected: go done
// Got: Uncaught "SyntaxError": "expected one of ';' or 'line terminator', got '=>' in lexical declaration binding list at line 5, col 21"

// This works, but the arrow version below doesn't
// async function go() {
//   return new Promise(() => console.log("go done"));
// }

const go = async () => {
  new Promise(() => console.log("go done"));
};

go();
