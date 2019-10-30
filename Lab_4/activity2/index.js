var dict = {
    "dictionary_name": "default",
    "entries":
        [{
            "key": ["stupid", "dumb", "idiot", "unintelligent", "simple-minded", "braindead", "foolish", "unthoughtful"],
            "answer": ["educated", "informed", "schooled", "skilled", "trained", "logical", "rational", "reasonable", "valid"]
        }, {
            "key": ["unattractive", "hideous", "ugly"],
            "answer": ["attractive", "beauteous", "beautiful", "lovely", "pretty", "ravishing"]
        }, {
            "key": ["ambiguous", "cryptic", "dark", "nebulous", "obscure", "unintelligible"],
            "answer": ["obvious", "plain", "unambiguous", "understandable", "unequivocal"]
        }, {
            "key": ["incapable", "incompetent", "inept", "unable", "unfit", "unqualified", "weak", "artless"],
            "answer": ["accomplished", "fit", "adept", "complete", "consummate"]
        }, {
            "key": ["emotionless", "heartless", "unkind", "mean", "selfish", "evil"],
            "answer": ["benevolent", "benignant", "gentle", "kind", "clement"]
        }, {
            "key": ["idle"],
            "answer": ["Can you reply something?", "You have been idle for more than 30 seconds", "Whats the matter with you? Submit something"]
        }]
}

var data = " Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Id consectetur purus ut faucibus. Nunc mattis enim ut tellus elementum sagittis vitae et leo. Et sollicitudin ac orci phasellus egestas tellus. Augue neque gravida in fermentum et sollicitudin ac orci phasellus. Tempus urna et pharetra pharetra massa massa ultricies mi. Nisl purus in mollis nunc sed id semper risus in. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Mattis molestie a iaculis at. Vel turpis nunc eget lorem. Eu scelerisque felis imperdiet proin fermentum leo vel orci. Libero enim sed faucibus turpis in eu mi bibendum. Adipiscing diam donec adipiscing tristique. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Proin nibh nisl condimentum id venenatis a condimentum vitae.";
var greetingElement = document.getElementById("content");
greetingElement.innerHTML = data;
var commentSubmitted = false;

if (commentSubmitted == false){
    window.setTimeout(function(){
        console.log( dict.entries[5].answer[0]);
        alert(dict.entries[5].answer[0]);
    }, 5000);
}

function showGreeting(){
    var userName = document.getElementById('username').value;
    var greeting = document.getElementById('greeting');
    greeting.innerHTML = "Welcome " + userName + " " + "to the movie review system. Please enter your comments!";
    
}

function submitComment(){
    commentSubmitted = true;
    var commentVlaue = document.getElementById('commentBox').value;
    console.log("comment value ", commentVlaue);
    
    
    for (i in dict.entries){
        console.log(dict.entries[i].key[i]);
        console.log(dict.entries[i].answer[i]);
        if (commentVlaue.includes(dict.entries[i].key[i])){
            console.log("true")
            commentVlaue.replace(dict.entries[i].key[i], dict.entries[i].answer[i]);

            console.log("censored", commentVlaue);
        }
    }
}

console.log("dictionary", dict);