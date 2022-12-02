function log() {
  console.log("Hello World from a JS code string!");
  console.log(`Project version: ${PROJECT_VERSION}`);
}

function hello(name = "Mathias") {
  const person = new Person(name, 38);
  person.say_hello();
}

function reverse() {
  const arr = ["a", 2, 5.4, "Hello"];
  return reverseAppend(arr);
}

log();
hello();
reverse();

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
const asyncCall = new Promise((resolve) => {
  resolve();
}).then(() => {
  console.log("Promise resolved!");
});

// Class
class UserProfile {   
   constructor(firstName, lastName) { 
      this.firstName = firstName;
      this.lastName = lastName;     
   }  
    
   getName() {       
     console.log(`The Full-Name is ${this.firstName} ${this.lastName}`);    
   } 
}
const obj = new UserProfile('John', 'Smith');
obj.getName();

// Arrow function
const sum = (a, b) => a + b;
sum(10, 20);
