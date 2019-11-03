/**
 * 
 */
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
var commentSubmitted = false;
var userNameSubmitted = false;


// if (commentSubmitted == false){
//     window.setTimeout(function(){
//         console.log( dict.entries[5].answer[0]);
//         alert(dict.entries[5].answer[0]);
//     }, 5000);
// }

window.onload = () => {
    userComesBack();
}

/**
 * 
 * @param {*} name 
 * @param {*} userSubmitted 
 * @param {*} nameValue 
 */
function setCookie(name , userSubmitted, nameValue){
    if (userSubmitted){
        document.cookie = name + "=" + nameValue;            
    }
}

/**
 * 
 * @param {*} cookieName 
 */
function getCookie(cookieName){
    var cName = cookieName + "=";
    console.log(cName)
    var cArray = document.cookie.split(";");
    console.log(cArray)
    for (val in cArray){
        var c = cArray[val];
        console.log(c)
        while(c.charAt(0) == ' '){
            console.log("in while")
            c = c.substring(1);
        } 
        if(c.indexOf(cName) == 0){
            console.log("in indexOf")
            console.log(c.substring(cName.length, c.length))
            return c.substring(cName.length, c.length);
        }       
    }
    return "";
}

/**
 * @method userComesBack()
 */
function userComesBack(){
    console.log("function called!!")
    var user = getCookie('username')
    if(user !== ""){
        alert("welcome back" + " " + user);
        displayContent(user);
    }
}

/**
 * 
 * @param {*userName} userName 
 * @author Madhukar Raj
 */
function displayContent(userName){
    console.log("inside display content")
    var greeting = document.getElementById('greeting');
    greeting.innerHTML = "Welcome " + userName + " " + "to the movie review system. Please enter your comments!";
    var getContentElement = document.getElementById("content");
    getContentElement.innerHTML = data;

}

/**
 * @author Madhukar Raj
 * @method submitUsername()
 * This method takes displays the contet based on the user
 */
function submitUsername() {
    userNameSubmitted = true;
    var userName = document.getElementById('username').value;
    
    console.log("username after submit ", userName);
    if(userName != ''){
        var savedUser = getCookie('username')
        if(savedUser == userName){
            userComesBack()
        }
        displayContent(userName);
        setCookie("username", userNameSubmitted, userName);

    }
    
}
/**
 * @method submitComment()
 * @author Madhukar Raj
 * This function parses the submitted comments
 */
function submitComment() {
    commentSubmitted = true;
    var commentValue = document.getElementById('commentBox').value;
    console.log("comment value ", commentValue);
    var cleanString = commentValue.replace(/\n+/g, " ");
    var commentArr = cleanString.split(' ');
    console.log(commentArr);
    commDict = {}
    for (i in commentArr){
        commDict[i] = commentArr[i]
    }
    if(Object.values(commDict).includes("")){
        var arr = Object.values(commDict)
        delete commDict[arr.indexOf("")];
    }
    
    console.log(commDict);
    var comVal = Object.values(commDict);
    for (i in dict.entries){
        var goodWords = dict.entries[i].answer.slice(0);
        for (j in comVal){
            if(dict.entries[i].key.includes(comVal[j])){
                var replacementWrd = goodWords.pop();
                console.log(replacementWrd)
                var t1 = dict.entries[i].key[j]
                var t2 = commDict[j]
                console.log(t1, t2);
               var censoredStr =  cleanString.replace(commDict[j], replacementWrd);
               cleanString = censoredStr;
            }
        }
    }
    console.log("censored", censoredStr);
}

console.log("dictionary", dict);