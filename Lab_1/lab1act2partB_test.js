"use strict";

console.log("Testing calc()");

var calculator = new Calculator();

console.log(calculator.calc('{"op": "add", "number" : 5 }'));
console.log(calculator.calc('{"op": "subtract", "number" : 2 }'));
console.log(calculator.calc('{"op": "add", "number" : 19 }'));


console.log("Testing exec()");

var expression = ['{"op":"subtract", "exp": {"op": "add", "number": 9}, "expected" : 0 }', 
'{ "op": "add", "exp": { "op": "add", "number": 4 }, "expected": 8 }', 
'{"op": "add", "exp": {"op": "add", "number": -1}, "expected" : -2 }', 
'{"op":"subtract", "exp": {"op": "add", "exp": {"op": "subtract", "number": 3}}, "expected" : 0 }'];

var val = exec(expression);