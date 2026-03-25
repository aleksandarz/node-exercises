import { add, subtract, multiply } from "./mathUtils.js";

let num1 = 10;
let num2 = 5;

console.log(`Number one: ${num1}, Number two: ${num2}`);
console.log(`Result for addition is: ${add(num1, num2)}`);
console.log(`Result for subtraction: ${subtract(num1, num2)}`);
console.log(`Result for multiplication: ${multiply(num1, num2)}`);