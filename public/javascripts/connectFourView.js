var gameStates = {
	CONTINUE: -1,
	DRAW: 0,
	WIN: 1
};
var players = {
	playerOne: 1,
	playerTwo: 2
};
var board = document.getElementById('gameGrid');
var gameState;
var currentCol;
var currentRow;
var currentPlayer;
var id = 1;

// the logic part
var c4 = new ConnectFour();

startGame();

function startGame() {
	initializeGame();
	document.getElementById('gameButton').addEventListener('click', startGame);
}

// Initializes the everything in the game
function initializeGame() {
	createChip(players.playerOne);
	board.innerHTML = "";
	gameState = gameStates.CONTINUE;
	c4.initializeGrid();
	createTable();
	document.getElementById('gamePrompt').innerHTML = "Make your move Player " + currentPlayer;
	document.getElementById('gameButton').innerHTML = "Clear board";
}

// Initializes the player's chip
function createChip(player) {
	currentPlayer = player;
	this.player = player;
	this.color = (player == players.playerOne ? 'red' : 'yellow');
	this.id = id.toString();
	id++;

	var $this = this;
	  
	board.onclick = function(event) {
		if (gameState == gameStates.CONTINUE) {
			var cellWidth = 61.5;
			currentCol = Math.floor((event.clientX - board.offsetLeft) / cellWidth);
			if ((currentCol >= 0) && (currentCol <= 6)) {
				var available = c4.isColAvailable(currentCol);	// Checks if the column is not yet full
				if (available) {
					board.innerHTML += '<div id="ch' + $this.id + '" class="chip ' + $this.color + '"></div>';
					document.getElementById('ch' + $this.id).style.left = (6 + (cellWidth * currentCol)) + 'px';
					dropChip($this.id, $this.player);
				}
			}
		}
	}
}

// Creates the Conner Four grid
function createTable() {
	board.innerHTML = '<table id="mainTable" style="width:100%;height:100%"></table>';
	var mainTable = document.getElementById("mainTable");
	mainTable.innerHTML += '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
						+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
						+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
						+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
						+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
						+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
}

function dropChip(cid, player) {
	var cellHeight = 62;
	currentRow = c4.firstFreeRow(currentCol, player);
	document.getElementById('ch' + cid).style.top = (6 + (currentRow * cellHeight)) + 'px';
	setTimeout(checkGameState, 0);
}

function checkGameState() {
	gameState = c4.checkWinningPatterns(currentRow, currentCol);
	
	switch(gameState) {
		case gameStates.CONTINUE:
			createChip(3 - currentPlayer);
			document.getElementById('gamePrompt').innerHTML = "Your turn Player " + currentPlayer;
			break;
		case gameStates.DRAW:
			document.getElementById('gamePrompt').innerHTML = "It's a draw! No winner.";
			document.getElementById('gameButton').innerHTML = "Start new game";
			break;
		case gameStates.WIN:
			document.getElementById('gamePrompt').innerHTML = "Player " + currentPlayer + " won!";
			document.getElementById('gameButton').innerHTML = "Start new game";
			break;
		default:
			break;
	}
}