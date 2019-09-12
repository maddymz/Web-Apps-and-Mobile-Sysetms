"use strict";

console.log(" Testing calc()");

var calulator = new Calculator(0);

console.log(calculator.calc('{"op": "add", "number" : 5 }'));
console.log(calculator.calc('{"op": "subtract", "number" : 2 }'));
console.log(calculator.calc('{"op": "add", "number" : 19 }'));


console.log("Testing exec()");

var expression = ['{"exp": {"op": "add", "number": 9}, "expected" : 9 }',
 '{ "exp": { "op": "subtract", "number": 4 }, "expected": -4 }', 
 '{"exp": {"op": "add", "number": -1}, "expected" : -1 }',
 '{"exp": {"op": "subtract", "number": 0}, "expected" : 0 }'];

var value = exec(expression);