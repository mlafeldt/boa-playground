function log() {
  console.log("Hello World from a JS code string!");
  console.log(`Project version: ${PROJECT_VERSION}`);
}

function hello(name = "Mathias") {
  const person = new Person(name, 38);
  person.sayHello();
}

log();
hello();

// Testing some ES6 features
// https://www.boardinfinity.com/blog/top-10-features-of-es6/

// Array Destructuring
let fruits = ["Apple", "Banana"];
let [a, b] = fruits; // Array destructuring assignment
console.log(a, b);

// Object Destructuring
let person = { name: "Peter", age: 28 };
let { name, age } = person; // Object destructuring assignment
console.log(name, age);

// Promise
new Promise<void>((resolve) => {
  resolve();
}).then(() => {
  console.log("Promise resolved!");
});

// Class
class UserProfile {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName() {
    console.log(`The Full-Name is ${this.firstName} ${this.lastName}`);
  }
}
const obj = new UserProfile("John", "Smith");
obj.getName();

// Arrow function
const sum = (a: number, b: number) => a + b;
console.log(sum(10, 20));

// Module loading
import { reverse } from "./lib";
const arr = reverse("Hello");
console.log("Array:", arr);

async function go() {
  return new Promise(() => console.log("go done"));
}
go().catch((e) => console.error(e));
