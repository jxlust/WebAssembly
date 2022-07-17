// The entry file of your WebAssembly module.
// import * as other from "./Other";
// import { logInteger, showInteger } from "./env";
// import { addOne, log } from "./Other";
import { addTwo } from "./Add";
function add(a: i32, b: i32): i32 {
  return a + b;
}

function fibonacci(n: i32): i32 {
  if (n < 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
function testAbort(n: i32): i32 {
  if (n === 100) {
    // abort();
  }
  return n;
}

// declare function log(n: i32): void;
// function testLog(n: i32): i32 {
//   logInteger(n);
//   log(n);
//   return n + showInteger(n) + addOne(n);
// }
function testLog(n: i32): i32 {
  return addTwo(n);
}

// function testLog(n: i32): void {
//   new TestClass().logShow(n);
// }

export { add, fibonacci, testAbort, testLog };
export { getType } from "./StringDemo";
