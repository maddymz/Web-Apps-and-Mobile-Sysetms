"use strict";

console.log("Testing calc()");

var precalObj = new PreCalc(0);

console.log(precalObj.calc('{"op": "add", "number" : 5, "expected": 5}'));
console.log(precalObj.calc('{"op": "push", "number": 5}'));
console.log(precalObj.calc('{"op": "pop" }'));


var jsonArray = ['{"op": "add", "number" : 5, "expected": 5}',
'{"op": "push", "number": 5}',
'{"op": "pop" }',
'{"op" : "push", "expr" : {"op" : "subtract", "number" : 2}, "expected": -2}',
'{"op" : "push", "expr" : {"op" : "add", "number" : 19}, "expected": 17}',
'{"op" : "pop"}',
'{ "op": "print"}',
'{"op" : "push", "expr" : {"op" : "add", "expr": {"op" : "pop"}, "number" : -2}, "expected": -2}',
'{"op" : "print"}',
'{ "op": "pop"}',
'{ "op": "pop"}',
'{ "op": "pop"}'
];

var value = exec(jsonArray);