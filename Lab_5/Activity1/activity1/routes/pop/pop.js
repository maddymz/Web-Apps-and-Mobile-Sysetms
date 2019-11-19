var express = require('express');
var pop = express.Router();


pop.get('/pop', function (req, res, next){
    console.log(req['_remoteAddress']);
    resData = {
      "pop": true
    }
    res.set({
      'Content-type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':  'Content-Type, Accept',
      'Accept': 'application/json'
    });
    res.send(resData);
  });

  module.exports = pop;