var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var historyStack = {
  'history': [],
  'activity': []
}

router.get('/', function(req, res, next) {
  res.sendFile(path.join('/public/javascripts/index.html'));
});


router.post('/euro', function (req, res, next) {
  var userAgent = req.headers['user-agent'];
  var ipAddress = req['_remoteAddress'];
  console.log(req.headers['user-agent']);
  var usd = req.body.usd
  var euro = 0.9 * usd;
  
  var userOperation = 'Operand' +' '+  usd +' ' + 'was converted from USD' + ' ' + euro +' '+ 'EURO'+ ' '+ 'IP' + ' ' + ipAddress +' ' + userAgent;
  historyStack.history.push(userOperation);
  historyStack.activity.push(userOperation);

  var resJson = {
    "euro": euro + " in EURO",
    "userAgent": userAgent,
    "ip": ipAddress,
    "activity": historyStack.activity
  }
  fs.writeFile("../history.json", JSON.stringify(historyStack), 'utf8', function(err){
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

router.post('/pound', function (req, res, next) {
  request = req.body;
  var userAgent = req.headers['user-agent'];
  var ipAddress = req['_remoteAddress'];
  console.log(req.body.usd);
  var usd = req.body.usd
  var pound = 0.78 * usd;
  var userOperation = 'Operand' +' '+  usd +' ' + 'was converted from USD' + ' ' + pound +' '+ 'POUND'+ ' '+ 'IP' + ' ' +ipAddress +' ' + userAgent;
  historyStack.history.push(userOperation);
  historyStack.activity.push(userOperation);
  var resJson = {
    "pound": pound + " in POUND",
    "userAgent": userAgent,
    "ip": ipAddress,
    "activity": historyStack.activity
  }
  fs.writeFile("../history.json", JSON.stringify(historyStack), 'utf8', function(err){
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

router.get('/pop', function (req, res, next){
  fs.readFile('../history.json', 'utf8', function(err, fileData){
    if (err){
      throw err;
    }
    var data = JSON.parse(fileData);
    console.log("hist stack", data.activity);
    data.activity.pop();
    fs.writeFile("../history.json", JSON.stringify(data), 'utf8', function(err){
      if(err){
        throw err;
      }
      res.set({
        'Content-type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':  'Content-Type, Accept',
        'Accept': 'application/json'
      });
      res.send(data);
    })

  });
});

router.get('/history', function (req, res, next){
  fs.readFile('../history.json', 'utf8', function(err, fileData){
    if (err){
      throw err;
    }
    console.log("hist stack", fileData);
  res.set({
    'Content-type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':  'Content-Type, Accept',
    'Accept': 'application/json'
  });
  res.send(fileData);
  })
});

router.get('/reset', function(req,res){
  fs.readFile('../history.json', 'utf8', function(err, fileData){
    if (err){
      throw err;
    }
    var data = JSON.parse(fileData);
    console.log("reset stack", data);
    data.history.length = 0;
    data.activity.length = 0;
    historyStack.activity.length = 0;
    historyStack.history.length = 0;
    console.log("reset", data)

    fs.writeFile('../history.json',JSON.stringify(data), 'utf8', function(err){
      if(err){
        throw err;
      }
      res.set({
        'Content-type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':  'Content-Type, Accept',
        'Accept': 'application/json'
      });
      res.send(data);
    });
  
  });
});
module.exports = router;
