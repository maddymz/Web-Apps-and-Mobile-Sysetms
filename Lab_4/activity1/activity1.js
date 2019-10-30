// 1. Output to the console the <ol> element encompassing the results of the search
document.querySelector('ol');

// 2. Output to the console the code for the "onload" event on the <body> element
document.querySelector('body').onload;

//3.Output to the console the 2nd child node underneath the <body> element
document.querySelector('body').childNodes[2];

//4.Output to the console the number of <h2> tags in the page
document.getElementsByTagName('h2').length;

//5. Output to the console the value in the search bar (you must get this from the search bar not anywhere else on the page)
document.getElementById('sb_form_q').value;

//6. Make the "Make Bing your search engine" text in the upper right corner result go away
document.getElementById('b_opalpers').remove();
