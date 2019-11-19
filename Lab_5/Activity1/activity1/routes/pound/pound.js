var express = require('express');
var pound = express.Router();

pound.post('/pound', function (req, res, next) {
    request = req.body;
    var userAgent = req.headers['user-agent'];
    var ipAddress = req['_remoteAddress'];
    console.log(req.body.usd);
    var usd = req.body.usd
    var pound = 0.78 * usd;
    var resJson = {
      "pound": pound,
      "userAgent": userAgent,
      "ip": ipAddress
    }
    var userOperation = 'Operand' +' '+  usd +' ' + 'was converted from USD' + ' ' + resJson.pound +' '+ 'POUND'+ ' '+ 'IP' + ' ' +resJson.ip +' ' + resJson.userAgent;
    historyStack.stack.push(userOperation);
    fs.writeFile("../history.json", JSON.stringify(historyStack), ['utf8', 'w+'], function(err){
      if(err){
        throw err
      }
    });
    res.set({
      'Content-type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':  'Content-Type, Accept',
      'Accept': 'application/json'
    });
    res.send(resJson);
  });

module.exports = pound;