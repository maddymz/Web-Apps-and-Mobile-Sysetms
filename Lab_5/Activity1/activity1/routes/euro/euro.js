var express = require('express');
var euro = express.Router();

euro.post('/euro', function (req, res, next) {
    var userAgent = req.headers['user-agent'];
    var ipAddress = req['_remoteAddress'];
    console.log(req.headers['user-agent']);
    // data = JSON.parse(req.body)
    var usd = req.body.usd
    // USD = 100;
    var euro = 0.9 * usd;
    var resJson = {
      "euro": euro,
      "userAgent": userAgent,
      "ip": ipAddress
    }
    var userOperation = 'Operand' +' '+  usd +' ' + 'was converted from USD' + ' ' + resJson.euro +' '+ 'EURO'+ ' '+ 'IP' + ' ' + resJson.ip +' ' + resJson.userAgent;
    historyStack.stack.push(userOperation);
    fs.writeFile("/history.json", JSON.stringify(historyStack), 'utf8', function(err){
      if(err){
        throw err
      }
    });
    // appState.add(userOperation);
    // console.log(appState);
    res.set({
      'Content-type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':  'Content-Type, Accept',
      'Accept': 'application/json'
    });
    res.send(resJson);
  });

module.exports = euro;