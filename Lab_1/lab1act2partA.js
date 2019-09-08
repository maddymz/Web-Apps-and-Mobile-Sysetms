// Javascript prefix calculator 

"use strict";

var jsonArray = ['{"op": "add", "number" : 5 }',
'{"expr": {"op": "add", "number": 9}, "expected" : 9 }',
 '{ "expr": { "op": "subtract", "number": 4 }, "expected": -4 }', 
 '{"expr": {"op": "add", "number": -1}, "expected" : -1 }',
 '{"expr": {"op": "subtract", "number": 0}, "expected" : 0 }'];

class Calculator {
    constructor(initialValue){
        this.initialValue = initialValue;
    }

    calc(data) {
        console.log('in exec', data);
        if(data.expr != undefined){
            if (data.expr.op == "add"){
                var sol = this.initialValue + data.expr["number"];
            }else if (data.expr.op == "subtract"){
                var sol = this.initialValue - data.expr["number"];
            } 
        }else {
            if (data.op == "add"){
                var sol = this.initialValue + data.number;
            }else if(data.op == "subtract"){
                var sol = this.initialValue + data.number;
            }
        }
       
        return sol;
    }
}

function exec(data) {
    const calcObj = new Calculator(0);
        for (var item in data) {
            var parsedData = JSON.parse(data[item]);
            var solution = calcObj.calc(parsedData);
            if (parsedData.hasOwnProperty("expr")){
                console.log(solution, '=', parsedData.expected);
            } else {
                console.log(solution);
            }
        }
}


exec(jsonArray);
