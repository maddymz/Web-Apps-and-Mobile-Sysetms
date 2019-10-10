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
        var object = {
            tags:"hallo",
            author: "Dr.M",
            date: "2019-07-10"
        }
        this.filter(object);
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
            data[index].answer = "changed again";
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

    filter(object){
        fs.readFile("./QA.json", function(err, data){
            if(err){
                throw err;
            }

            var data = JSON.parse(data);

            data = data.filter(function (item) {
                for (var key in object) {
                    if (item[key] === undefined || item[key] != object[key]) {
                        return false;
                    } else if (item[key] === object[key] || item[key].includes(object[key])) {
                        return true;
                    }
                }
            });

            console.log("fitered data", JSON.stringify(data));
        });
    }
}


var obj = new FAQ();
obj.createServer();

module.exports = FAQ;