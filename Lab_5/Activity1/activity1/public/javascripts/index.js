"use strict";
var request = new XMLHttpRequest();
var stack = [];

function empty(s) {
    return s == "" || s.indexOf(' ') >= 0;
}
/**
 * @author Madhukar Raj
 * @method
 */
function validateInput() {
    var inputVal = document.getElementById("usd").value;
    if (empty(inputVal)) {
        document.getElementById("euro").setAttribute("disabled", "disabled");
        document.getElementById("pound").setAttribute("disabled", "disabled");
    }
    else {
        document.getElementById("euro").removeAttribute("disabled");
        document.getElementById("pound").removeAttribute("disabled");
    }
}
var input = document.getElementById('usd');
input.addEventListener('keyup', validateInput);


/**
 * @author Madhukar Raj
 * @method 
 * 
 */
function convertToEuro() {
    var usdValue = document.getElementById('usd').value;
    var data = {
        'usd': usdValue
    };
    var url = "http://localhost:8008/euro"
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status == 200) {
                console.log("response", request.responseText);
                var response = JSON.parse(request.responseText);
                var stack = response.activity;
                document.getElementById('currency').innerHTML = response.euro;
                if (stack.length > 0) {
                    document.getElementById('reset').removeAttribute('disabled');
                    var item = stack.pop();
                    var historyList = '<li>' + item + '</li>';
                    document.getElementById('activityHistory').innerHTML += historyList;
                }

                console.log("euro", stack);
            } else {
                console.log("server error");
            }
        }
    }

    request.send(JSON.stringify(data));
}

function convertToPound(data) {
    var usdValue = document.getElementById('usd').value;
    var data = {
        'usd': usdValue
    };
    var url = "http://localhost:8008/pound"
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status == 200) {
                document.getElementById('userActivity').innerHTML = '';
                console.log(request.responseText);
                var response = JSON.parse(request.responseText);
                var stack = response.activity;
                document.getElementById('currency').innerHTML = response.pound;
                if (stack.length > 0) {
                    document.getElementById('reset').removeAttribute('disabled');
                    var item = stack.pop();
                    var historyList = '<li>' + item + '</li>';
                    document.getElementById('activityHistory').innerHTML += historyList;
                }
                console.log("pound", stack);
            } else {
                console.log("server error");
            }
        }
    }

    request.send(JSON.stringify(data));
}

function performPop() {
    document.getElementById('activityHistory').innerHTML = '';
    document.getElementById('userActivity').innerHTML = '';
    var request = new XMLHttpRequest();
    var url = "http://localhost:8008/pop";
    request.open('GET', url, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status == 200) {
                console.log(request.responseText)
                var response = JSON.parse(request.responseText);
                var stack = response.activity;
                for (var val in stack) {
                    var activityList = '<li>' + stack[val] + '</li>';
                    document.getElementById('userActivity').innerHTML += activityList;
                }
                console.log("pop", stack);

            } else {
                console.log("error")
            }
        }
    }
    request.send();
}

function showHistory() {
    document.getElementById('activityHistory').innerHTML = '';
    var request = new XMLHttpRequest();
    var url = "http://localhost:8008/history";
    request.open('GET', url, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status == 200) {
                console.log(request.responseText)
                document.getElementById('userActivity').hidden = true;
                var response = JSON.parse(request.responseText);
                var stack = response.history;
                for (var val in stack) {
                    var historyList = '<li>' + stack[val] + '</li>';
                    document.getElementById('activityHistory').innerHTML += historyList;
                }
            } else {
                console.log("error")
            }
        }
    }
    request.send();
}

function reset() {
    var request = new XMLHttpRequest();
    var url = "http://localhost:8008/reset";
    request.open('GET', url, true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onreadystatechange = function () {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status == 200) {
                console.log(request.responseText)
                document.getElementById('userActivity').innerHTML = '';
                document.getElementById('activityHistory').innerHTML = '';
                document.getElementById('reset').setAttribute('disabled', 'disabled');
                document.getElementById("euro").setAttribute("disabled", "disabled");
                document.getElementById("pound").setAttribute("disabled", "disabled");
                document.getElementById("currency").innerHTML = 0;
                document.getElementById("usd").value = 0;
            } else {
                console.log("error")
            }
        }
    }
    request.send();
}