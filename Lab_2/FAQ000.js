"use strict";

var http = require('http');
var fs = require('fs');

class FAQ{
    
    constructor(){
    }

    createServer(){
        // this.writeToStore();
        // this.updateAnswer(0);
        // this.updateTags(0);
        // this.deleteQA(0);
        // var object = {
        //     tags:"hallo",
        //     author: "Dr.M",
        //     date: "2019-07-10"
        // }

        this.filter();
        http.createServer(function (req, res) {
            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.end();
        }).listen(8080);
        console.log('Server Started' + ' http://localhost:8080');
    }

    writeToStore(){
        fs.readFile('./QA.json', function (err, jsonFile) {
            if (err) {
                throw err;
            }
            var data = JSON.parse(jsonFile);
            data.push({
                firstname:"Madhukar",
                lastname:"Raj"
            })

            fs.writeFile("./QA.json", JSON.stringify(data),'utf8', function(err){
                if (err){
                    throw err
                }
            });
        });
    }
    
    updateAnswer(index){
        fs.readFile("./QA.json", function(err, data){
            if(err){
                throw err
            }

            var data = JSON.parse(data)
            console.log(data);
            
            // data.forEach(element => {
            //     if (element.answer == 'You should know this by now') {
            //         element.answer = "changed";
            //     }
            data[index].answer = "changed again";
               
            // });

            console.log(data);

            fs.writeFile("./QA.json", JSON.stringify(data), function(err){
                if (err){
                    throw err;
                }
            });
        
        });
    }

    updateTags(index){
        fs.readFile("./QA.json", function(err, data){
            if (err){
                throw err
            }

            var data = JSON.parse(data);

            data[index].tags = "Changed!!";

            fs.writeFile("./QA.json", JSON.stringify(data), function(err){
                if (err){
                    throw err;
                }
            });
        });
    }

    deleteQA(index){
        fs.readFile("./QA.json", function(err, data){
            if (err){
                throw data;
            }
            
            var data = JSON.parse(data);
            console.log(data);
            data.splice(index,1);

            fs.writeFile("./QA.json", JSON.stringify(data), function(err){
                if (err){
                    throw err;
                }
            });
        });
    }

    filter(){
        fs.readFile("./QA.json", function(err, data){
            if(err){
                throw err;
            }

            var data = JSON.parse(data);
            // console.log(data);
            var filterAuthor = data.filter(val =>{
                return val.author == "Dr.M";
            });
            var filterTags = data.filter(val =>{
                return val.tags.includes("assign");
            });
            // var filterDate = data.filter(val =>{
            //     return val.date.includes();
            // });

            console.log(filterAuthor);
            console.log(filterTags);
            // console.log(filterDate);
        });
    }
}


var obj = new FAQ();
obj.createServer();