"use strict";

console.log(" Testing FAQ00");

var FAQ = new FAQ();

var index = 0; // this can be any index of json data array
console.log(" Testing writeToStore()");
console.log(FAQ.writeToStore());

console.log(" Testing updateAnswer()");
console.log(FAQ.updateAnswer(index));

console.log(" Testing updateTags()");
console.log(FAQ.updateTags(index));

console.log(" Testing deleteQA()");
console.log(FAQ.deleteQA(index));

console.log(" Testing filter()");
var object = {
    tags:"hallo",
    author: "Dr.M",
    date: "2019-07-10"
}
console.log(FAQ.filter(object));

