const calc = require('/html/lab1act2partA.js')
const assert = require('assert');




// var expression = ['{"exp": {"op": "add", "number": 9}, "expected" : 9 }',
//  '{ "exp": { "op": "subtract", "number": 4 }, "expected": -4 }', 
//  '{"exp": {"op": "add", "number": -1}, "expected" : -1 }',
//  '{"exp": {"op": "subtract", "number": 0}, "expected" : 0 }'];

 it("should return correct values", () =>{
     assert.equal(calc.obj.calc('{"op": "add", "number" : 5 }'), 5)
 })
