"use strict";

var http = require('http');
var fs = require('fs');
var FAQ = require('./FAQ');
const querystring = require('querystring');

class FAQService{

    constructor() {
    }

    createServer(self){
        var faqService = new FAQService();
        var faq = new FAQ();
        http.createServer(function (req, res) {
            switch(req.method){
                case "GET":
                    if(req.url === '/'){
                        faqService.login(req,res);
                    }else if(req.url === '/student'){
                        faqService.student(req, res);                    
                    }else if(req.url === '/teacher'){
                        faqService.teacher(req,res);
                    }
                    break;
                case "POST":
                    if(req.url === '/'){
                        faqService.collectFormData(req,function(result){
                            console.log("username in coll form", result.username);

                            faq.filter(result, function(data){
                               faqService.displayQA(data, function(displayres){
                                    res.write(displayres);
                               });
                            });
                            
                            if(result.logout){
                                faqService.logout(req,res, function(htmlData){
                                    res.write(htmlData);
                                    res.end();
                                });
                            }else{
                                if (result.username === 'student' && result.password === 'asu2019' && result.student === 'on'){
                                    var role = 'Student';
                                    faqService.student(req, res, result, role);
                                }else if (result.username === 'instructor' && result.password === 'asu2019' && result.instructor === 'on'){
                                    var role = "Instructor";
                                    faqService.teacher(req, res, result, role);
                                }else{
                                    faqService.loginFails(req,res);
                                }
                            }
                        });
                    }
                    break;
            }
        }).listen(3000);

        console.log("Server started " + " " +  "http://localhost:3000");
    }

    login(req, res) {
    
        res.writeHead(200, { 'content-type': 'text/html' });
        fs.readFile('./login.html', function (err, html) {
            if (err) {
                throw err;
            }
            res.write(html);
            res.end();
        });
    }

    student(req, res, result, role){
        var user = "username="+result.username;
        var userrole = "role="+role;
        var cookies = [user, userrole];
        res.writeHead(200, { 
            'Location': '/student',
            'content-type': 'text/html', 
            'Set-cookie': cookies[0]+" ;"+cookies[1] });
        fs.readFile('./homepage.html', function(err, html){
            if(err){
                throw err;
            }
    
            console.log(cookies);
            console.log("student" ,result);
            html = html.toString().replace('{user}', result.username);
            html = html.toString().replace('{username}', result.username);
            html = html.toString().replace('{role}', role);
            res.write(html);
            res.end();
        });
        
    }
    
    teacher(req, res, result, role){
        var user = "username="+result.username;
        var userrole = "role="+role;
        var cookies = [user, userrole];
        res.writeHead(200,{
            'content-type':' text/html',
            'Set-cookie': cookies[0]+" ;"+cookies[1] });
        fs.readFile('./homepage.html', function(err, html){
            if(err){
                throw err;
            }
            html = html.toString().replace('{user}', result.username);
            html = html.toString().replace('{username}', result.username);
            html = html.toString().replace('{role}', role);
            res.write(html);
            res.end();
        });
       
    }
    
    loginFails(req,res,result){
        res.writeHead(200,{
            'content-type':' text/html'});
        fs.readFile('./login.html', function(err, html){
            if(err){
                throw err;
            }
            html = html.toString().replace('Login', "Login failed, please login again");
            res.write(html);
            res.end();
        });
    }
    
    logout(req,res, callback){
        var cookie = req.headers.cookie
        console.log(cookie);
        res.writeHead(200,{
            'content-type':' text/html'});
        fs.readFile('./login.html', function(err, html){
            if(err){
                throw err;
            }
            html = html.toString().replace('Login', "You have been logged Out!!");
            callback(html);
        });
    }
    
    collectFormData(request, callback){    
        const FORM_URL = 'application/x-www-form-urlencoded';
    
        if (request.headers['content-type'] === FORM_URL){
            let body = '';
            request.on('data', function(chunk){
                body += chunk.toString();
            });
            request.on('end', function(){
                var data = querystring.parse(body);
                data.toString = function(){return JSON.stringify(this);}
                callback(data);
            });
        }else{
            callback(null);
        }
    }

    displayQA(data, callback){
        fs.readFile('./homepage.html', function(err, html){
            if(err){
                throw err;
            }

            for(var key in data){
                html = html.toString().replace('{item}', data[key]);
            }

           callback(html);
        });
    }

}


var obj = new FAQService();
obj.createServer();

module.exports = FAQService;
