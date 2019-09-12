var add = (function(){
    var counter  =0;
    console.log(counter)
    return function () {
        counter += 1;
        console.log(counter);
        return counter;
    }
})();


console.log(add());
console.log(add());


