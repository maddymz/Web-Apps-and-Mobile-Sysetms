/**
 * Prefix Calculator using JavaScript
 */

 
"use strict";


//array of json object to be used by the calculator 
var jsonArray = ['{"expr": {"op": "add", "number": 9}, "expected" : 9 }',
 '{ "expr": { "op": "subtract", "number": 4 }, "expected": -4 }', 
 '{"expr": {"op": "add", "number": -1}, "expected" : -1 }',
 '{"expr": {"op": "subtract", "number": 0}, "expected" : 0 }'];

/**
 * Description
 * @class Calculator
 * @method calc
 * @param {} data
 * @return 
 */
class Calculator {
    constructor(initialValue){
        this.initialValue = initialValue;
    }

    calc(data) {      
        var parsedJson = JSON.parse(data);
        if(parsedJson.hasOwnProperty("expr") && parsedJson.expr != undefined){
            if (parsedJson.expr.op == "add"){
                var sol = this.initialValue + parsedJson.expr["number"];
            }else if (parsedJson.expr.op == "subtract"){
                var sol = this.initialValue - parsedJson.expr["number"];
            } 
        }else {
            if (parsedJson.op == "add"){
                var sol = this.initialValue + parsedJson.number;
            }else if(parsedJson.op == "subtract"){
                var sol = this.initialValue - parsedJson.number;
            }
        }
           
        return sol;
    }
}

/**
 * Description
 * @method exec
 * @param {} data
 * @return 
 */
function exec(data) {
    const calcObj = new Calculator(0);
        for (var item in data) {
            var solution = calcObj.calc(data[item]);
            var expected = JSON.parse(data[item]).expected;
            if (JSON.parse(data[item]).hasOwnProperty("expr")){
                console.log(solution, '=', expected);
            } else {
                console.log(solution);
            }
        }
}


exec(jsonArray);
