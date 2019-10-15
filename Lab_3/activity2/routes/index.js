var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var URL = 'mongodb://localhost:27017/';

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.answers = {
    ans:[]
  }
  console.log("date now", Date.now());
  console.log("login session", req.session);
  res.render('index', { title: 'Welcome user' });
});

router.all('/questions/:id', function(req, res, next){
  fs.readFile('./data/questions.json', 'utf8', function(err, filedata){
    if(err){
      throw err;
    }
    
    var ques = JSON.parse(filedata);
    var pref = {}
    
    // set user answer display preferences
    if('horizontal' in req.body){
      pref.horizontal = req.body.horizontal;
    }else if ('vertical' in req.body){
      pref.vertical = req.body.vertical;
    }
  
    var pageId = req.url.slice(11,12);

    //prefill user info on login 
    MongoClient.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      }, function(err, db){
        if (err) throw err;
  
        var dbo = db.db('answers');
        var collection = dbo.collection('userAnswers');
        if('match' in req.body && pageId == 1){
          req.session.username = req.body.username;
        }

        collection.findOne({username: req.session.username}, function(err, result, dbcallback){
          if(err) throw err;
          if(result != null && req.body.username === result.username){
            req.session.username = result.username;
            req.session.answers.ans = result.answers;
            dbcallback();
          }else{
            if("match" in req.body){
              req.session.username = req.body.username;
            }
            console.log("page id ", pageId - 1);        
            if('next' in req.body && pageId == 1){
              req.session.answers.ans.push({
                'qno': pageId -1 ,
                'ans': Object.keys(req.body)[0]
              });
             }else if('next' in req.body && pageId > 1){
              var queExists = req.session.answers.ans.some(function(el){
                return el.qno === pageId - 1;
              });
              
              console.log("question already exists", queExists);
                if(!queExists){
                  req.session.answers.ans.push({
                  'qno': pageId -1 ,
                  'ans': Object.keys(req.body)[0]
                });
              }
             }
            

            //if id is greater than ques array length redirect to main page 
             if((pageId) > ques.questions.length){
               MongoClient.connect(URL,{
                 useNewUrlParser: true,
                 useUnifiedTopology: true
                 }, function(err, db){
                 if (err) throw err;
                 console.log("database connected !!");
                 const dbo  = db.db('answers');
                 var newEntry = {username: req.session.username, answers: req.session.answers.ans}
                 dbo.collection("userAnswers").insertOne(newEntry, function(err, result){
                   if (err) throw err;                   
                   console.log("one item inserted in db!!");
                   db.close();
                 });

                 var matchDict = {
                  matches: []
                }
                var count = 0;
             dbo.collection("userAnswers").find().toArray().then(function(doc){
                  console.log(doc);
                  for(var i in doc){
                    for (var j in doc[i].answers){
                      console.log( doc[i].username, j , req.session.answers.ans[j])
                      if(req.session.answers.ans[j].ans == doc[i].answers[j].ans){
                        count = count + 1;
                      }
                    }
                    matchDict.matches.push({
                      user: doc[i].username,
                      count: count
                    });
                  }
                  console.log(" matches", matchDict.matches.sort(function(a,b){
                    return b.count - a.count;
                  }));
                  console.log(" not in db callback");
                  res.render('matches', {matches: matchDict.matches});
                }).catch(function(err){
                  console.log(err);
                }).finally(function(){
                  db.close();
                });
               });
               
             }else if (pageId == 0){
               res.redirect('/');
             }else{
               res.render('questions', { question: ques.questions[pageId -1 ], answer: req.session.answers.ans[pageId -1], qnos:ques.length, prefh:pref.horizontal, prefv: pref.vertical});
             }

          }
          
          function dbcallback(){
            //save user responses in persistence store - mongoDB
            if('next' in req.body){
             req.session.answers.ans.push({
               'qno': pageId -1 ,
               'ans': Object.keys(req.body)[0]
             });
            }
            
           //if id is greater than ques array length redirect to main page 
            if((pageId) > ques.questions.length){
              MongoClient.connect(URL,{
                useNewUrlParser: true,
                useUnifiedTopology: true
                }, function(err, db){
                if (err) throw err;
                console.log("database connected !!");
                const dbo  = db.db('answers');
                var newEntry = {username: req.session.username, answers: req.session.answers.ans}
                dbo.collection("userAnswers").insertOne(newEntry, function(err){
                  if (err) throw err;
                  console.log("one item inserted in db!!");
                  console.log("  in db callback");
                  db.close();
                });
                
                res.render('matches');
              });
             
            }else if (pageId == 0){
              res.redirect('/');
            }else{
              
              res.render('questions', { question: ques.questions[pageId -1 ], answer: req.session.answers.ans[pageId -1], qnos:ques.length, prefh:pref.horizontal, prefv: pref.vertical});
            }
          }
        });
      
      });    
  });
});

router.all('/preferences/:id', function(req, res, next){
  
  var quesID = req.url.slice(13,14);
  res.render('preferences', {quesid: quesID});
});
 
router.all('/matches', function(req, res, next){

  res.render('matches');
});

router.all('/adminlogin', function(req, res, next){
    res.render('adminlogin');
});

router.all('/editquestions', function(req, res, next){
 
  MongoClient.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, function(err, db){

      if(err) throw err;

      var dbo = db.db('answers');
      dbo.collection("credentials").findOne({username:'admin'}, function(err, result){
        if (err) throw err;
        
        if(result.username === req.body.username){
          if(result.password === req.body.password){
            if(req.body.username === req.body.password){
              var validUser = true;
            }
          }
        }
        if(validUser || 'addMore' in req.body || 'delMore' in req.body){
          fs.readFile('./data/questions.json', 'utf8', function(err, filedata){
            var ques = JSON.parse(filedata);
        
            res.render('editquestions', {questions: ques.questions});
          });
        } else{
          res.render('error', {message: "Please enter correct credentials", error: {status: 'Unauthorized User', stack: ""}});
        }
        db.close();
      });
    });
 
});

router.post('/add', function(req, res, next){
  fs.readFile('./data/questions.json', 'utf8', function(err, filedata, readCallback){
    var ques = JSON.parse(filedata);

    var options = req.body.options.split(',');

    var data = ques;
    var queExists = data.questions.some(function(el){
      return el.q_no === req.body.quesId;
    });

    if(!queExists){
      data.questions.push({
        q_no: parseInt(req.body.quesId),
        ques:  req.body.newQues,
        options: options
      });
    }

    
    fs.writeFile('./data/questions.json', JSON.stringify(data), 'utf8', function(err){
      if(err) throw err;

    });
    res.render('add');
  });

 
});

router.post('/delete', function(req, res, next){
  fs.readFile('./data/questions.json', 'utf8', function(err, filedata, readCallback){
    var ques = JSON.parse(filedata);
    var data = ques;

    data.questions.some(function(el){
      var index = data.questions.indexOf(el);
      if (el.q_no === parseInt(req.body.delquesId)){
        data.questions.splice(index, 1);
      }
    });
    fs.writeFile('./data/questions.json', JSON.stringify(data), 'utf8', function(err){
      if(err) throw err;

    });
    res.render('delete');
  });

});

router.all('/register', function(req, res, next){

  if('Register' in req.body){
    MongoClient.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      }, function(err, db){
  
        if(err) throw err;
  
        var dbo = db.db('answers');
        var newEntry = {username: req.body.username, password: req.body.password}
        dbo.collection("credentials").insertOne(newEntry, function(err, res){
          if (err) throw err;
          console.log("admin creds inserted in db!!");
          db.close();
        });
        res.redirect('/adminlogin');
      });
  }else{
    res.render('register');
  }
 
});
module.exports = router;
