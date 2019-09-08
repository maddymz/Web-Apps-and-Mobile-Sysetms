"use strict";

//array of jason object 
var nestedJsonArray = ['{"op":"subtract", "exprr": {"op": "add", "number": 9}, "exprected" : 0 }', 
'{ "op": "add", "exprr": { "op": "add", "number": 4 }, "exprected": 8 }', 
'{"op": "add", "exprr": {"op": "add", "number": -1}, "exprected" : -2 }', 
'{"op":"subtract", "exprr": {"op": "add", "exprr": {"op": "subtract", "number": 3}}, "exprected" : 0 }'];


class Calculator {
    constructor(initialvalue){
        this.initialvalue = initialvalue;
    }

    calc(data) {
        if (data.expr.expr != undefined) {
            if (data.expr.expr.op == "add") {
                var sum = this.initialvalue + data.expr["expr"]["number"];
                if (data.expr.op == "add") {
                    var sumExp = sum + sum;
                    if (data.op == "add") {
                        var result = sumExp + sumExp;
                    } else if (data.op == "subtract") {
                        var result = sumExp - sumExp;
                    }
                } else if (data.expr.op == "subtract") {
                    var diffExp = sum - sum;
                    if (data.op == "add") {
                        var result = diffExp + diffExp;
                    } else if (data["op"] == "subtract") {
                        var result = diffExp - diffExp;
                    }
                }
            } else if (data.expr.expr.op == "subtract") {
                var diff = this.initialvalue - data.expr["expr"]["number"];
                if (data.expr.op == "add") {
                    var sumExp = diff + diff;
                    if (data.op == "add") {
                        var result = sumExp + sumExp;
                    } else if (data.op == "subtract") {
                        var result = sumExp - sumExp;
                    }
                } else if (data.expr.expr.op == "subtract") {
                    var diffExp = diff - diff;
                    if (data.op == "add") {
                        var result = diffExp + diffExp;
                    } else if (data.op == "subtract") {
                        var result = diffExp - diffExp;
                    }
                }
            }
        } else {
            if (data.expr.op == "add") {
                var addition = this.initialvalue + data.expr["number"];
                if (data.op == "add") {
                    var result = addition + addition;
                } else if (data.op == "subtract") {
                    var result = addition - addition;
                }
            } else if (data.expr.op == "subtract") {
                var subtracttraction = this.initialvalue - data.expr["number"];
                if (data.op == "add") {
                    var result = subtracttraction + subtracttraction;
                } else if (data.op = "subtract") {
                    var result = subtracttraction - subtracttraction;
                }
            }
        }

        return result;
    }

    exec(data) {
        for (var item in data) {
            var parsedData = JSON.parse(data[item]);
            var solution = this.calc(parsedData);
            console.log(solution, '=', parsedData.exprected);
        }
    }
}

const calObj = new Calculator(0);
calObj.exec(nestedJsonArray);

