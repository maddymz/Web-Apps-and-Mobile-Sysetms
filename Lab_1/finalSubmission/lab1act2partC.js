/**
 * Prefix Calculator using JavaScript
 */

"use strict";

//array of json object to be used by the calculator 
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

/**
 * Description
 * @class PreCalc
 * @method calc
 * @param {} data
 * @return
 */
class PreCalc {
    constructor(initialValue){
        this.calcStack = [initialValue];
    }

    calc(data) {
        var parsedJson = JSON.parse(data);
        if (parsedJson.hasOwnProperty("expr") && parsedJson.expr.expr != undefined){
            if (parsedJson.expr.expr.op == "pop"){
                if (this.calcStack.length != 0){
                    this.calcStack.pop();
                    if (parsedJson.expr.op == "add"){
                        var result = this.calcStack[this.calcStack.length -1] + parsedJson.expr.number;
                        if (parsedJson.op == "push") {
                            this.calcStack.push(result);
                        } else if (parsedJson.op == "pop") {

                        }
                    } else if (parsedJson.expr.op = "subtract"){
                        var result = this.calcStack[this.calcStack.length -1] - parsedJson.expr.number;
                        if(parsedJson.op == "push"){
                            this.calcStack.push(result);
                        }
                    }
                }else if(this.calcStack.length == 0){
                    console.log("calculator stack is empty");
                }
        }else if (parsedJson.expr.expr.op == "push"){

        }
       
    } else if (parsedJson.hasOwnProperty("expr") && parsedJson.expr != undefined) {
        if(parsedJson.expr.op == "add"){
            var result = this.calcStack[this.calcStack.length -1] + parsedJson.expr.number;
            if(parsedJson.op = "push"){
                this.calcStack.push(result);
            }else if (parsedJson.op == "pop"){
                this.calcStack.pop();
            }
        } else if(parsedJson.expr.op == "subtract"){
            var result = this.calcStack[this.calcStack.length -1] - parsedJson.expr.number;
            if(parsedJson.op = "push"){
                this.calcStack.push(result);
            }else if (parsedJson.op == "pop"){
                this.calcStack.pop();
            }
        }
    } else {
        if (parsedJson.op == "add"){
            var result = this.calcStack[this.calcStack.length -1] + parsedJson.number;
        }else if (parsedJson.op == "subtract"){
            var result = this.calcStack[this.calcStack.length -1] - parsedJson.number;
        }else if (parsedJson.op == "push"){
            this.calcStack.push(parsedJson.number);
        }else if (parsedJson.op == "pop"){
            if(this.calcStack.length != 0){
                this.calcStack.pop();
            }else {
                console.log("Stack is empty");
            }
           
        }
    }

    if(parsedJson.op == "print"){
        console.log("Stack Values:\n")
        for (var item in this.calcStack){
            console.log(this.calcStack[item]);
        }
    }

    return result;
}
}

/**
 * Description
 * @method exec
 * @param {} data
 * @return 
 */
function exec(data){
    var obj = new PreCalc(0);
    for (var item in data) {
        var solution = obj.calc(data[item]);
        if(JSON.parse(data[item]).hasOwnProperty("expr") && solution != undefined){
            console.log(solution, '=', JSON.parse(data[item]).expected);
        }else if(solution != undefined){
            console.log(solution);
        }
    }
}

exec(jsonArray);

