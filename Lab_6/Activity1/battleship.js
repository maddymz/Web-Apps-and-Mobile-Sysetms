// set grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 50;
var guess = 0;
var username;
var numOfShips = 5
var shipLengths = [4]
/* lazy way of tracking when the game is won: just increment hitCount on every hit
   in this version, and according to the official Hasbro rules (http://www.hasbro.com/common/instruct/BattleShip_(2002).PDF)
   there are 17 hits to be made in order to win the game (you can decide for random ones to create only 4 ships (2,3,4,5 hits or a 6t one with 6 hits):
      Carrier     - 5 hits
      Battleship  - 4 hits
      Destroyer   - 3 hits
      Submarine   - 3 hits
      Patrol Boat - 2 hits
*/
var hitCount = 0;

var gameBoard = [];

// very simple form
var message = "restarted";

//ship model having locations
var ships = [
	{locations: [], hits: []},
	{locations: [], hits: []},
	{locations: [], hits: []},
	{locations: [], hits: []},
	{locations: [], hits: []}
]


function welcomeUser() {
	username = document.getElementById("username").value;
	document.getElementById("form").innerHTML = "Welcome " + username + ",<br>You are now ready to play battleship. <br> Click the board to fire at a ship. Try to sink every battleship!";

	setGame()

}

function setGame() {
	// set grid rows and columns and the size of each square
	guess = 0;
	message = "restarted";

	/* lazy way of tracking when the game is won: just increment hitCount on every hit
	   in this version, and according to the official Hasbro rules (http://www.hasbro.com/common/instruct/BattleShip_(2002).PDF)
	   there are 17 hits to be made in order to win the game (if you want to you can create ships with 2,3,4,5 - makes the random algorithm easier, remember to change hitcount then:
	      Carrier     - 5 hits
	      Battleship  - 4 hits
	      Destroyer   - 3 hits
	      Submarine   - 3 hits
	      Patrol Boat - 2 hits
	*/
	hitCount = 0;

	/* create the 2d array that will contain the status of each square on the board
	   and place ships on the board (later, create function for random placement!)

	   0 = empty, 1 = part of a ship, 2 = a sunken part of a ship, 3 = a missed shot
	*/
	
	// for(var i = 0; i<rows; i++){
	// 	for (var j =0; j<cols; j++){
	// 		if(){
	// 			gameBoard[i][j] = 1;
	// 		}else{
	// 			gameBoard[i][j] = 0;
	// 		}
	// 	}
	// }

	gameBoard = [
		[0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		[1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
		[1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	]

	var gameBoardContainer = document.getElementById("gameboard");
	// gameBoardContainer.setAttribute("hidden", false);

	// make the grid columns and rows
	for (i = 0; i < cols; i++) {
		for (j = 0; j < rows; j++) {

			// create a new div HTML element for each grid square and make it the right size
			var square = document.createElement("div");
			gameBoardContainer.appendChild(square);

			// give each div element a unique id based on its row and column, like "s00"
			square.id = 's' + j + i;
			square.classList.add("gameGrid");

			// set each grid square's coordinates: multiples of the current row or column number
			var topPosition = j * squareSize;
			var leftPosition = i * squareSize;

			// use CSS absolute positioning to place each grid square on the page
			square.style.top = topPosition + 'px';
			square.style.left = leftPosition + 'px';
		}
	}
	// set event listener for all elements in gameboard, run fireTorpedo function when square is clicked
	gameBoardContainer.addEventListener("click", fireTorpedo, false);
	//enable the restart button
	document.getElementById("restartBtn").disabled = false;

	document.getElementById("btnContainer").style.top="500px";

}
/**
 * 
 */

function shipLocations(){
	var locations;
	for(var val =0; val < numOfShips; val ++){
		if(locationOverlap(locations)){
			locations = createShips();
		}
		ships.locations[val] = locations;
	}
}
/**
 * 
 */
function createShips(){
	var direction = Math.floor(Math.random()*2);
	var row, col;
	var shipLocations = [];
	
	if(direction ===1){
		row = Math.floor(Math.random()* rows);
		col = Math.floor(Math.random()* (cols - shipLengths[val] + 1));
	}else {
		row = Math.floor(Math.random() * (rows - shipLength[val] + 1));
		col = Math.floor(Math.random() * cols);
	}

	
	for(var val in shipLengths){
		if(direction === 1){
			shipLocations.push(row + "" + (col + val));
		}else {
			shipLocations.push((row + val) +"" + col);
		}
		return shipLocations;
	}
	console.log(shipLocations)
}
/**
 * 
 * @param {*} locations 
 */
function locationOverlap(locations){
	for(var i=0; i < numOfShips; i++){
		var ship = ships[i];
	}

	for (var j=0; j < locations.length; j++){
		if (ship.locations.indexOf(locations[j])>=0){
			return true;
		}
	}
	return false
}

function showHistory() {

	if (document.getElementById("guessHistoryDetails").hasAttribute("hidden")) {
		document.getElementById("historyBtn").innerHTML = "Hide History";
		document.getElementById("guessHistoryDetails").removeAttribute("hidden");
	} else {
		document.getElementById("guessHistoryDetails").setAttribute("hidden", true);
		document.getElementById("historyBtn").innerHTML = "Show History";
	}
}

function showRecord() {
	if (document.getElementById("recordDetails").hasAttribute("hidden")) {
		document.getElementById("recordBtn").innerHTML = "Hide Record";
		document.getElementById("recordDetails").removeAttribute("hidden");
	} else {
		document.getElementById("recordDetails").setAttribute("hidden", true);
		document.getElementById("recordBtn").innerHTML = "Show Record";
	}
}

function restartGame() {
	// clear guess history
	document.getElementById("guessHistoryDetails").innerHTML = "";
	document.getElementById("recordDetails").innerHTML += username +" " + message + " game. <br>";
	setGame();
}

// initial code via http://www.kirupa.com/html5/handling_events_for_many_elements.htm:
function fireTorpedo(e) {

	// if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
	if (e.target !== e.currentTarget) {
		// extract row and column # from the HTML element's id
		var row = e.target.id.substring(1, 2);
		var col = e.target.id.substring(2, 3);

		guess = guess + 1;
		if (guess > 60) {
            message = "lost";
            alert("Too many tries you lost: " + guess + " tries.");
            Android.done('lost', username);
            return;
        }
        


		// if player clicks a square with no ship, change the color and change square's value
		if (gameBoard[row][col] == 0) {
		    if (guess >= 60) {
                message = "lost";
                alert("Too many tries you lost: " + guess + " tries. ");
            }
            else{
			e.target.style.background = '#bbb';
			// set this square's value to 3 to indicate that they fired and missed
			gameBoard[row][col] = 3;
			document.getElementById("guessHistoryDetails").innerHTML += "guess nr: " + guess + ": miss <br>";
			}

			// if player clicks a square with a ship, change the color and change square's value
		} else if (gameBoard[row][col] == 1) {
			e.target.style.background = 'red';
			// set this square's value to 2 to indicate the ship has been hit
			gameBoard[row][col] = 2;
			document.getElementById("guessHistoryDetails").innerHTML += "guess nr: " + guess + ": hit <br>";

			// increment hitCount each time a ship is hit
			hitCount++;
			// this definitely shouldn't be hard-coded, but here it is anyway. lazy, simple solution:
			if (hitCount == 17) {
				message = "won"
				alert("All enemy battleships have been defeated! You win! It took you " + guess + " tries. ");
				Android.done('won', username);
			}

			// if player clicks a square that's been previously hit, let them know
		} else if (gameBoard[row][col] > 1) {
			alert("Stop wasting your torpedos! You already fired at this location.");
			document.getElementById("guessHistoryDetails").innerHTML += "guess nr: " + guess + ": wasted <br>";
		}
	}
	e.stopPropagation();
}