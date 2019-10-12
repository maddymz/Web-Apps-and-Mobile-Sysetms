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
  console.log("login session", req.session);
  res.render('index', { title: 'Welcome user' });
});

router.all('/questions/:id', function(req, res, next){
  console.log("resposne for questions", req.body);
  fs.readFile('./data/questions.json', 'utf8', function(err, filedata){
    if(err){
      throw err;
    }
    
    var ques = JSON.parse(filedata);
    var pref = {}
    
    if('horizontal' in req.body){
      pref.horizontal = req.body.horizontal;
    }else if ('vertical' in req.body){
      pref.vertical = req.body.vertical;
    }
  
    // console.log("query url : ", req.url.slice(11, 12));
    var pageId = req.url.slice(11,12);


    //prefill user info on login 
    MongoClient.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      }, function(err, db){
        if (err) throw err;
  
        // console.log("database  ", db.db('answers'));
        var dbo = db.db('answers');
        var collection = dbo.collection('userAnswers');
        // console.log("dab collection", collection);
        if('match' in req.body && pageId == 1){
          req.session.username = req.body.username;
        }
        console.log(" user name session", req.session.username);
        collection.findOne({username: req.session.username}, function(err, result, dbcallback){
          if(err) throw err;
          // console.log("colecton", result);

          if(result != null && req.body.username === result.username){
            // console.log("result" , result)
            req.session.username = result.username;
            req.session.answers.ans = result.answers;
            dbcallback();
          }else{
            if("match" in req.body){
              req.session.username = req.body.username;
            }

            // console.log("inside db else", req.session.username);
            console.log("page id ", pageId - 1);
            console.log(req.session.answers);
          //   if(req.session.answers.ans.length != 0){
          //  }
            console.log("question exists", quesExists);
            if('next' in req.body && pageId == 1){
              req.session.answers.ans.push({
                'qno': pageId -1 ,
                'ans': Object.keys(req.body)[0]
              });
             }else if('next' in req.body && pageId > 1){
                for (var key in req.session.answers.ans){
                  console.log(req.session.answers.ans[key].qno);
                if ( pageId - 1 == req.session.answers.ans[key].qno){
                  var quesExists = true
                }
              }
                if(!quesExists){
                  req.session.answers.ans.push({
                  'qno': pageId -1 ,
                  'ans': Object.keys(req.body)[0]
                });
              }
             }
             console.log("else session answers", req.session.answers);
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
                 dbo.collection("userAnswers").insertOne(newEntry, function(err, res){
                   if (err) throw err;
                   console.log("one item inserted in db!!");
                   var collection = dbo.collection('userAnswers');
                   console.log("collection for matching", collection.find({}, function(err, result){
                     if(err) throw err;
                    console.log("collection result", result);
                   }));
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
          
          function dbcallback(){
            console.log("db session", req.session);
            console.log("ans", req.session.answers.ans[0]);
            
            console.log("session name", req.session.username);
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
                dbo.collection("userAnswers").insertOne(newEntry, function(err, res){
                  if (err) throw err;
                  console.log("one item inserted in db!!");
                  db.close();
                });

                dbo.collection('userAnswers').aggregate([{$match: {}}])
                res.render('matches');
              });
              
            }else if (pageId == 0){
              res.redirect('/');
            }else{
              res.render('questions', { question: ques.questions[pageId -1 ], answer: req.session.answers.ans[pageId -1], qnos:ques.length, prefh:pref.horizontal, prefv: pref.vertical});
            }
          }
        });
        db.close();
      });    
  });
});

router.all('/preferences/:id', function(req, res, next){
  
  var quesID = req.url.slice(13,14);
  res.render('preferences', {quesid: quesID});
});
 
router.all('/matches', function(req, res, next){
  MongoClient.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, function(err, db){

      var dbo = db.db('answers');
      var collection = dbo.collection('userAnswers');

      console.log("match collection", collection);
    });
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
        console.log("username, password", result.username, result.password);
        if(result.username === req.body.username){
          if(result.password === req.body.password){
            if(req.body.username === req.body.password){
              var validUser = true;
            }
          }
        }
        if(validUser){
          fs.readFile('./data/questions.json', 'utf8', function(err, filedata){
            var ques = JSON.parse(filedata);
        
            console.log("questions", ques);
           
            res.render('editquestions', {questions: ques.questions});
          });
        } else {
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
        q_no: req.body.quesId,
        ques:  req.body.newQues,
        options: options
      });
    }

    console.log("modified data obj", data);
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
      console.log("element", el);
      var index = data.questions.indexOf(el);
      console.log("index", index);
      if (el.q_no === req.body.delquesId){
        data.questions.splice(index, 1);
      }
    });
    
    console.log("modified data obj", data);
    fs.writeFile('./data/questions.json', JSON.stringify(data), 'utf8', function(err){
      if(err) throw err;

    });
    res.render('delete');
  });

});

router.all('/register', function(req, res, next){
  console.log(req.body);
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
