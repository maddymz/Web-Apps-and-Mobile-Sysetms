var express = require('express');
var fs = require('fs');
var router = express.Router();
var history = {
  stack:[]
};


/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('./data/article.txt', function(error, filedata){
    if(error){
      throw error
    }
    var file = filedata;
    console.log("text file data", file);

    fs.readFile('./data/comments.json', 'utf8', function(err, filedata){
      if (err){
        throw err;
      }

      console.log("file data", filedata)
      if(filedata !== ""){
        var commentData =JSON.parse(filedata);
      }else {
        var commentData = {
          commentsArray: []
        };
        commentData.commentsArray.push({
          'id': '',
          'comment': ''
        });
      }

      res.render('index', { 
          message: 'Welcome to Article Review System', 
          articleContent: file, 
          showcomments: commentData.commentsArray
        });
    });
  });
});

//post add page
router.post('/add', function(req,res,next){
  var comments = {
    commentsArray: []
  };
 
  fs.readFile('./data/history.json', 'utf8', function(err, filedata){
    if (err){
      throw err;
    }

   if(filedata !== ""){ 
    var activityHistory = JSON.parse(filedata);
    if(activityHistory.stack.length != 0){
      activityHistory.stack.push({
        'operation': req.body.addComment,
        'operand' : req.body.commentId,
        'ip' : req._remoteAddress,
        'useragent': req.headers["user-agent"] 
      });
    }
  }else{
    var activityHistory = {
      stack:[]
    };
    activityHistory.stack.push({
      'operation': req.body.addComment,
      'operand' : req.body.commentId,
      'ip' : req._remoteAddress,
      'useragent': req.headers["user-agent"] 
    });
  }
    var data = JSON.stringify(activityHistory);
    fs.writeFile('./data/history.json', data, 'utf8', addCallback);
  });

  function addCallback(){
    fs.readFile('./data/comments.json','utf8', function(err, filedata) {
      
      if(filedata !== ""){
        var data = JSON.parse(filedata)
        console.log("json add comment data", data);
          console.log("comnnets array not empty!!");
          if(req.body.commentId !== "" && req.body.comments !== ""){
            if(data.commentsArray.length !=0){
              for (var key in data.commentsArray){
                console.log("key ", key);
                if(data.commentsArray[key].id !== req.body.commentId){
                  data.commentsArray.push({
                    'id': req.body.commentId,
                    'comment': req.body.comments
                  });
                }else {
                  console.log("duplicate ida")
                  error = {
                    message: "Invalid Id",
                    status: "Id already in use."
                  }
                  res.render('adderror', {error: error});
                  
                }
              }
            }else{
              data.commentsArray.push({
                'id': req.body.commentId,
                'comment': req.body.comments
              });
            }
           
          }else{
            // error = "Id or Comment should not be Empty."
            // throw new Error("Id or Comment should not be Empty.");
            error = {
              message: "Empty field",
              status: "Id or Comment should not be Empty."
            }
            res.render('adderror', {error: error});
          }
          fs.writeFile('./data/comments.json', JSON.stringify(data), 'utf8', function(err){
            if(err){
              throw err;
            }
          });
      }else {
        console.log(" in file data!!")
        if(req.body.commentId !== "" && req.body.comments !== ""){
          comments.commentsArray.push({
            'id': req.body.commentId,
           'comment': req.body.comments
          });
        }else{
          // error = "Id or Comment should not be Empty."
          throw new Error("Id or Comment should not be Empty.");
        }
        fs.writeFile('./data/comments.json',JSON.stringify(data), 'utf8', function(err){
          if (err){
            throw err;
          }
        });
      }
      res.render('add');
      });
  }

});

//post delete page 
router.post('/delete', function (req, res, next) {
  fs.readFile('./data/history.json', 'utf8', function (err, filedata) {
    if (err) {
      throw err;
    }
    if (filedata !== "") {
      var history = JSON.parse(filedata);
      history.stack.push({
        'operation': req.body.delComment,
        'operand': req.body.deleteId,
        'ip': req._remoteAddress,
        'useragent': req.headers["user-agent"]
      });
    } else {
      var history = {
        stack: []
      };
      history.stack.push({
        'operation': req.body.delComment,
        'operand': req.body.deleteId,
        'ip': req._remoteAddress,
        'useragent': req.headers["user-agent"]
      });
    }
    var data = JSON.stringify(history);
    fs.writeFile('./data/history.json', data, 'utf8', deleteCallback);
  });
    
  function deleteCallback(){
    fs.readFile('./data/comments.json', 'utf8', function(err, filedata){
      if(err){
        throw err;
      }

      console.log("file data", filedata)
      if(filedata !== ""){
        var data = JSON.parse(filedata);
        for (var key in data.commentsArray){
          console.log(' key' , data.commentsArray[key]);
          if (data.commentsArray[key].id == req.body.deleteId){
            var index = data.commentsArray.indexOf(data.commentsArray[key]);
            if(index >-1){
              data.commentsArray.splice(index,1);
            }
          }else {
            error = {
              message: "Invalid Id",
              status: "Id does not Exist."
            }
            res.render('deleteerror', {error: error});
          }
        }
      }else{
        error = {
          message: "File Empty",
          status: "Cannot delete from an empty file."
        }
        res.render('deleteerror', {error: error});
      }
   
      console.log(JSON.stringify(data));
      var modifiedData = JSON.stringify(data);
      fs.writeFile('./data/comments.json', modifiedData, 'utf8', function(err){
        if(err){
          throw err;
        }
        console.log("inside delete write file ")
      });
      res.render('delete');
    });
    
  }
   
});

//get view page 
router.get('/view', function(req,res,next){
  fs.readFile('./data/history.json', 'utf8', function(err, filedata){
    if(err){
      throw err;
    }
    var activityArray = [];
    if(filedata !== ""){
      var jsonData = JSON.parse(filedata);
      console.log("history data ", jsonData);
      for (var key in jsonData.stack){
        console.log("key", jsonData.stack[key]);
        activityArray.push(jsonData.stack[key].operation + "," + jsonData.stack[key].operand + "," + jsonData.stack[key].ip  + "," + jsonData.stack[key].useragent);
      }
    }else {
      // err.message = "Error in reading the file data."
      throw new Error("Error in reading the file data.");
    }
    console.log('activity array', activityArray);
    res.render('view', {activity: activityArray});
  });
});

//supposrts both get and post 
router.all('/undo', function(req, res, next){
  fs.readFile('./data/history.json', 'utf8', function(err, filedata){
    if (err){
      throw err;
    }

    var jsonData = JSON.parse(filedata);
    jsonData.stack.pop();
     var data = JSON.stringify(jsonData);
    console.log(jsonData);
    fs.writeFile('./data/history.json', data, 'utf8', undoCallback);
  });

  function undoCallback(){
    fs.readFile('./data/comments.json', 'utf8', function(err, filedata){
      if(err){
        throw err;
      }

      var jsonData = JSON.parse(filedata);
      jsonData.commentsArray.pop();
      var data = JSON.stringify(jsonData);
      console.log(jsonData);

      fs.writeFile('./data/comments.json', data, 'utf8', commentCallback);
    });
  }

  function commentCallback(){
    res.render('undo');
  }
 
});

router.get('/reset', function(req, res){
  fs.readFile('./data/history.json', 'utf8', function(err, filedata){
    if (err){
      throw err;
    }
    var historyData = JSON.parse(filedata);
    historyData.stack.splice(0, historyData.stack.length);

    console.log("empty history ", historyData);
    fs.writeFile('./data/history.json', JSON.stringify(historyData), 'utf8', callback);
  }); 

  function callback(err){
    if(err){
      throw err;
    }
    fs.readFile('./data/comments.json', 'utf8', function(err, filedata){
      if(err){
        throw err;
      }
      var comments = JSON.parse(filedata);
      comments.commentsArray.splice(0, comments.commentsArray.length);
      console.log("empty comments", comments);
      fs.writeFile('./data/comments.json', JSON.stringify(comments), 'utf8', function(err){
        if(err){
          throw err;
        }
      });
    });
  }
  res.render('reset');
});
module.exports = router;
