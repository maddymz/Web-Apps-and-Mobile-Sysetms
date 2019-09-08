"use strict";

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

class PreCalc {
    constructor(initialValue){
        this.calcStack = [initialValue];
    }

    calc(data) {
        if (data.hasOwnProperty("expr") && data.expr.expr != undefined){
            if (data.expr.expr.op == "pop"){
                if (this.calcStack.length != 0){
                    this.calcStack.pop();
                    if (data.expr.op == "add"){
                        var result = this.calcStack[this.calcStack.length -1] + data.expr.number;
                        if (data.op == "push") {
                            this.calcStack.push(result);
                        } else if (data.op == "pop") {

                        }
                    } else if (data.expr.op = "subtract"){
                        var result = this.calcStack[this.calcStack.length -1] - data.expr.number;
                        if(data.op == "push"){
                            this.calcStack.push(result);
                        }
                    }
                }else if(this.calcStack.length == 0){
                    console.log("calculator stack is empty");
                }
        }else if (data.expr.expr.op == "push"){
            this.calcStack.push();
        }
       
    } else if (data.hasOwnProperty("expr") && data.expr != undefined) {
        if(data.expr.op == "add"){
            var result = this.calcStack[this.calcStack.length -1] + data.expr.number;
            if(data.op = "push"){
                this.calcStack.push(result);
            }else if (data.op == "pop"){
                this.calcStack.pop();
            }
        } else if(data.expr.op == "subtract"){
            var result = this.calcStack[this.calcStack.length -1] - data.expr.number;
            if(data.op = "push"){
                this.calcStack.push(result);
            }else if (data.op == "pop"){
                this.calcStack.pop();
            }
        }
    } else {
        if (data.op == "add"){
            var result = this.calcStack[this.calcStack.length -1] + data.number;
        }else if (data.op == "subtract"){
            var result = this.calcStack[this.calcStack.length -1] - data.number;
        }else if (data.op == "push"){
            this.calcStack.push(data.number);
        }else if (data.op == "pop"){
            if(this.calcStack.length != 0){
                this.calcStack.pop();
            }else {
                console.log("Stack is empty");
            }
           
        }
    }

    if(data.op == "print"){
        console.log("Stack Values:\n")
        for (var item in this.calcStack){
            console.log(this.calcStack[item]);
        }
    }

    return result;
}
}

function exec(data){
    var obj = new PreCalc(0);
    for (var item in data) {
        var parsedData = JSON.parse(data[item]);
        var solution = obj.calc(parsedData);
        if(parsedData.hasOwnProperty("expr") && solution != undefined){
            console.log(solution, '=', parsedData.expected);
        }else if(solution != undefined){
            console.log(solution, "=", parsedData.expected);
        }
    }
}

exec(jsonArray);