"use strict";

console.log(" Testing FAQService00");

var FAQService = new FAQService();

var index = 0; // this can be any index of json data array
console.log(" Testing writeToStore()");
console.log(FAQService.createServer());

console.log(" Testing writeToStore()");
console.log(FAQService.login(req, res));

console.log(" Testing updateAnswer()");
console.log(FAQService.student(req, res, result, role));

console.log(" Testing updateTags()");
console.log(FAQService.teacher(req, res, result, role));

console.log(" Testing loginFails()");
console.log(FAQService.loginFails(req,res,result));

console.log(" Testing logout()");
console.log(FAQService.logout(req,res, callback));

console.log(" Testing collectFormData()");
console.log(FAQService.collectFormData(request, callback));