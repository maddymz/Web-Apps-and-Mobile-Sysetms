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


var idleMsg = dict.entries[5].answer.slice(0)
if (commentSubmitted == false){
    window.setTimeout(function(){
        console.log( dict.entries[5].answer[0]);
        if(idleMsg.length == 0){
            idleMsg = dict.entries[5].answer.slice(0)
        }
        messg = idleMsg.pop()
        alert(messg);
    }, 30000);
}

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
    var cArray = document.cookie.split(";");
    for (val in cArray){
        var c = cArray[val];
        while(c.charAt(0) == ' '){
            c = c.substring(1);
        } 
        if(c.indexOf(cName) == 0){
            return c.substring(cName.length, c.length);
        }       
    }
    return "";
}

function setUserState(username){
    var commentValue = document.getElementById('commentBox');
    commentValue.innerHTML = localStorage.getItem(username);
}
/**
 * @method userComesBack()
 */
function userComesBack(){
    console.log("function called!!")
    var user = localStorage.getItem('user');
    if(user !== ""){
        alert("welcome back" + " " + user);
        displayContent(user);
        setUserState(user);
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
    localStorage.setItem('user', userName);
    console.log("username after submit ", userName);
    if(userName != ''){
        var savedUser = localStorage.getItem('user');
        if(savedUser == userName){
            userComesBack()
        }
        displayContent(userName);
        setCookie("username", userNameSubmitted, userName);
    }
}
/**
 * 
 * @param {*} commentValue 
 * Function to parse comment
 */
function parseComment(commentValue){
    var cleanString = commentValue.replace(/\n+/g, " ");
    var commentArr = cleanString.split(' ');
    commDict = {}
    for (i in commentArr){
        commDict[i] = commentArr[i]
    }
    if(Object.values(commDict).includes("")){
        var arr = Object.values(commDict)
        delete commDict[arr.indexOf("")];
    }

    var parsedString = {
        "0": cleanString,
        "1": commentArr, 
        "2": commDict 
    }

    return parsedString;
}

/**
 * @author Madhukar Raj
 * @param {*} obj
 * function to replace the refrained key words 
 */

function replaceKeyWords(obj){
    count = 0;
    for (i in dict.entries){
        var goodWords = dict.entries[i].answer.slice(0);
        for (j in obj[2]){
            if(dict.entries[i].key.includes(obj[2][j])){
                if(goodWords.length == 0){
                    goodWords = dict.entries[i].answer.slice(0);
                }
                var replacementWrd = goodWords.pop();
                count += 1;
               var censoredStr =  obj[0].replace(obj[2][j], replacementWrd);
               obj[0] = censoredStr;
            }
        }
    }
    console.log("censored:", obj[0]);
    console.log(" count", count);
    if(count > 0){
        localStorage.setItem('count', count);
    }
    return obj[0];
}

function checkValidJson(obj){
    console.log(obj[0]);
    console.log(obj[0]['stupid']);
    var t = JSON.stringify(obj[0]);
    // var t = obj[0];
    console.log(t)
    var m = t.match(/\"\{.*\:.*\}\"/g);
    console.log(m)
    if(m == null){
        alert("not a valid json!!");
    }else{
        var parJs = JSON.parse(obj[0]);
        for(i in dict.entries){
            for (j in dict.entries[i].key){
                if (dict.entries[i].key[j] in parJs){
                    dict.entries[i].answer.push(parJs[dict.entries[i].key[j]]);
                }
            }
        }

        alert("Word added to dictionary and \n the dictionary is smarter ");
    }
    console.log(dict);
}
/**
 * @method saveToLocalStorage()
 * @param {*} cenRes 
 * Saves censored response to localstorage
 */
function saveToLocalStorage(cenRes){
    var user = localStorage.getItem('user');
    localStorage.setItem(user, cenRes);
    sessionStorage.res = cenRes;
    sessionStorage.uncens = localStorage.getItem('unsensored');
    console.log(localStorage.getItem(user));
}
function resetAppState(){
    var user = localStorage.getItem('user');
    var userContent = localStorage.getItem(user);
    localStorage.removeItem(userContent);
    sessionStorage.clear()
}
function searchDict(value){
    var userVal = value.split(' ');

    var ans = { }
    var searches = []
    var userInArea = document.getElementById('commentBox');
    var temp = ' ';
    for(i in dict.entries){
        for (j in dict.entries[i].key){
            if (userVal.includes(dict.entries[i].key[j])){
                ans[dict.entries[i].key[j]] = dict.entries[i].answer
                temp = temp + ans[dict.entries[i].key[j]]
            }
        }
    }
    userInArea.value = temp
    console.log(ans);
    searches.push(value);
    localStorage.setItem('history', searches);
}
function showHistory(){
    var hist = localStorage.getItem('history');
    console.log(" histiry" , hist);
    var historyPara = document.getElementById('history');
        historyPara.innerHTML = hist;
}
function showCount(){
    var cVal = localStorage.getItem('count');
    var commBox = document.getElementById('commentBox');
    commBox.value = "Count of rude words" + ' ' + cVal;
}
function performOperations(){
    var userInput = document.getElementById('commentBox');
    var userVal = localStorage.getItem('uncensored');
    if(userInput.value.includes('/clear')){
        resetAppState(userInput.value);
    }else if (userInput.value.includes('/search')){
        searchDict(userVal);
    }else if (userInput.value.includes('/history')){
        console.log("inside history!!")
        showHistory();
    }else if (userInput.value.includes('/count')){
        showCount();
    }else {
        // showList();
    }
}
/**
 * @method submitComment()
 * @author Madhukar Raj
 * This function parses the submitted comments
 */
function submitComment() {
    commentSubmitted = true;
    var commentValue = document.getElementById('commentBox');
    localStorage.setItem('uncensored', commentValue.value);
    console.log(" unc set in loc" , commentValue.value);
    var commObj = parseComment(commentValue.value)
    var cencoredRes = replaceKeyWords(commObj);
    console.log(" censored res", cencoredRes);
    commentValue.value = cencoredRes;
    saveToLocalStorage(cencoredRes);
    performOperations();

}

