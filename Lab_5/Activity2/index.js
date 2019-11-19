function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
function getBranchDetails(data){
  const url = data
}
function getDetails(){
    var username = document.getElementById("userName").value;
    if(username == ''){
        alert("please enter a valid username");
    }else{
        const url = 'https://api.github.com/users/' + username + '/repos';
        fetch(url)
        .then((resp)=> resp.json())
        .then(function (data) {
            console.log("github data", data);
            var issues = {};
            var sum = 0;
            for (var val in data){
            if (val < 2){
                issues[data[val].name] = data[val].open_issues_count;
                var row = document.getElementById('table').insertRow()
                var tableRow = '<td>' +  data[val].name + '</td>' +
                                '<td>' + data[val].created_at + '</td>' +
                                '<td>' + data[val].open_issues_count + '</td>' +
                                '<td>' + data[val].size + '</td>' +
                                '<td>' + data[val].forks + '</td>' +
                                '<td>' + data[val].html_url + '</td>' +
                                '<td>' + data[val].language + ' ,' + data[val].languages_url  + '</td>' +
                                '<td>' + data[val].downloads_url + '</td>'+
                                '<td>' + '<button id="branches">' + 'Branches' + '</button>' + '</td>'
                row.innerHTML = tableRow;
            }
           
            }
            var i;
            var dropdown = document.getElementById('dropdown');
            for(i = 2; i < 7; i++){
                var opt = document.createElement("option"); 
                opt.text = data[i].name;
                opt.value = data[i].name;
                dropdown.options.add(opt);
            }
            // document.getElementById('dropdown');
           
            dropdown.addEventListener('change', function(){
                var selectedVal = dropdown.options[dropdown.selectedIndex].value;
                var rowCount = document.getElementById('table').getElementsByTagName("tr").length;
                if(rowCount > 3){
                    document.getElementById('table').deleteRow(3);  
                }
                console.log(selectedVal);
                for (var val in data){
                    if(String(data[val].name) == selectedVal){
                        issues[data[val].name] = data[val].open_issues_count;
                        var row = document.getElementById('table').insertRow()
                        var tableRow = '<td>' +  data[val].name + '</td>' +
                                        '<td>' + data[val].created_at + '</td>' +
                                        '<td>' + data[val].open_issues_count + '</td>' +
                                        '<td>' + data[val].size + '</td>' +
                                        '<td>' + data[val].forks + '</td>' +
                                        '<td>' + data[val].html_url + '</td>' +
                                        '<td>' + data[val].language + ' ,' + data[val].languages_url  + '</td>' +
                                        '<td>' + data[val].downloads_url + '</td>'+
                                        '<td>' + '<button id="branches">' + 'Branches' + '</button>' + '</td>'
                        row.innerHTML = tableRow;
                    }
                }
            })
          
            const keys = Object.keys(issues);
            const values = Object.values(issues);
            for(const val of Object.keys(issues)){
                sum += issues[val];
            }
            var avg = sum/ keys.length;
            console.log("average",avg);
            var max = Math.max(...values);
            var maxRepo = getKeyByValue(issues, max);
            console.log(maxRepo);
            console.log("maximum", max);
            var infoDiv = document.getElementById('issueInformation')
            var info = 'The average number of issues is'+' ' + avg + ' ' + 'and the repository with the maximum number of issues is'+' '+ maxRepo;
            infoDiv.innerHTML = info;
    
            console.log(issues);
    
            document.getElementById('branches').addEventListener("click", function(){
                getBranchDetails(data);
            })
        })
        .catch(function(err){
            console.log("error", JSON.stringify(err));    
        });
    }
   
}