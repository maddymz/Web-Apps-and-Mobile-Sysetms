var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.answers = {
    ans:[]
  }
  res.render('index', { title: 'Welcome user' });
});

router.all('/questions/:id', function(req, res, next){
  console.log("resposne for questions", req.body);
  fs.readFile('./data/questions.json', 'utf8', function(err, filedata){
    if(err){
      throw err;
    }
    
    var ques = JSON.parse(filedata);
    console.log('request', req.body);
    req.session.name = req.body.username;
    console.log("session", req.session);
    console.log("session name", req.session.name);

    console.log(" pref" , req.body)
    var pref = {}
    
    if('horizontal' in req.body){
      pref.horizontal = req.body.horizontal;
      console.log(pref);
    }else if ('vertical' in req.body){
      pref.vertical = req.body.vertical;
      console.log(pref);
    }
  
    console.log("query url : ", req.url.slice(11, 12));
    var pageId = req.url.slice(11,12);
    //save user responses in persistence store - mongoDB
    if('next' in req.body){
     req.session.answers.ans.push({
       'qno': pageId -1 ,
       'ans': Object.keys(req.body)[0]
     });
    }
    
    console.log("session values", req.session);
   //if id is greater than ques array length redirect to main page 
    if((pageId) > ques.questions.length){
      MongoClient.connect('mongodb://localhost:27017/',{
        useNewUrlParser: true,
        useUnifiedTopology: true
        }, function(err, db){
        if (err) throw err;
        console.log("database connected !!");
        const dbo  = db.db('answers');
        var newEntry = {answers: req.session.answers.ans}
        dbo.collection("userAnswers").insertOne(newEntry, function(err, res){
          if (err) throw err;
          console.log("one item inserted in db!!");
          db.close();
        });
        res.render('matches');
      });
      
    }else if (pageId == 0){
      res.redirect('/');
    }else{
      res.render('questions', { question: ques.questions[pageId -1 ], qnos:ques.length, prefh:pref.horizontal, prefv: pref.vertical});
    }
    
  });
});

router.all('/preferences/:id', function(req, res, next){
  
  var quesID = req.url.slice(13,14);
  res.render('preferences', {quesid: quesID});
});
 
router.all('/matches', function(req, res, next){

  res.render('matches');
});
module.exports = router;
