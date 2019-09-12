/**
 * Prefix Calculator using JavaScript
 */

"use strict";

//array of json object to be used by the calculator 
var nestedJsonArray = ['{"op":"subtract", "expr": {"op": "add", "number": 9}, "expected" : 0 }', 
'{ "op": "add", "expr": { "op": "add", "number": 4 }, "expected": 8 }', 
'{"op": "add", "expr": {"op": "add", "number": -1}, "expected" : -2 }', 
'{"op":"subtract", "expr": {"op": "add", "expr": {"op": "subtract", "number": 3}}, "expected" : 0 }'];

/**
 * Description
 * @class Calculator
 * @method calc
 * @param {} data
 * @return
 */
class Calculator {
    constructor(initialvalue){
        this.initialvalue = initialvalue;
    }

    calc(data) {
        var parsedData = JSON.parse(data);
        if (parsedData.expr.expr != undefined) {
            if (parsedData.expr.expr.op == "add") {
                var sum = this.initialvalue + parsedData.expr.expr.number;
                if (parsedData.expr.op == "add") {
                    var sumExp = sum + sum;
                    if (parsedData.op == "add") {
                        var result = sumExp + sumExp;
                    } else if (parsedData.op == "subtract") {
                        var result = sumExp - sumExp;
                    }
                } else if (parsedData.expr.op == "subtract") {
                    var diffExp = sum - sum;
                    if (parsedData.op == "add") {
                        var result = diffExp + diffExp;
                    } else if (parsedData.op == "subtract") {
                        var result = diffExp - diffExp;
                    }
                }
            } else if (parsedData.expr.expr.op == "subtract") {
                var diff = this.initialvalue - parsedData.expr.expr.number;
                if (parsedData.expr.op == "add") {
                    var sumExp = diff + diff;
                    if (parsedData.op == "add") {
                        var result = sumExp + sumExp;
                    } else if (parsedData.op == "subtract") {
                        var result = sumExp - sumExp;
                    }
                } else if (parsedData.expr.expr.op == "subtract") {
                    var diffExp = diff - diff;
                    if (parsedData.op == "add") {
                        var result = diffExp + diffExp;
                    } else if (parsedData.op == "subtract") {
                        var result = diffExp - diffExp;
                    }
                }
            }
        } else {
            if (parsedData.expr.op == "add") {
                var addition = this.initialvalue + parsedData.expr.number;
                if (parsedData.op == "add") {
                    var result = addition + addition;
                } else if (parsedData.op == "subtract") {
                    var result = addition - addition;
                }
            } else if (parsedData.expr.op == "subtract") {
                var subtraction = this.initialvalue - parsedData.expr.number;
                if (parsedData.op == "add") {
                    var result = subtraction + subtraction;
                } else if (parsedData.op = "subtract") {
                    var result = subtraction - subtraction;
                }
            }
        }

        return result;
    }
}

/**
 * Description
 * @method exec
 * @param {} parsedData
 * @return 
 */
function exec(data) {
    var  calObj = new Calculator(0);
    for (var item in data) {
        var solution = calObj.calc(data[item]);
        var expected = JSON.parse(data[item]).expected;
        console.log(solution, '=', expected);
    }
}


exec(nestedJsonArray);


