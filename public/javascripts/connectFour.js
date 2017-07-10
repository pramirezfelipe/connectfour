/**************************************
 * Contains the logic part of the code
 **************************************/
var ConnectFour = function() {

	var gameGrid = [];
	var fullColumn = [];	// keeps the column numbers that are already full
	var board = {
		COLUMNS: 7,
		ROWS: 6
	};
	var gameStates = {
	    CONTINUE: -1,
		DRAW: 0,
		WIN: 1
	};
	
	this.initializeGrid = function() {
	    var i;
		
		fullColumn = [];
		
		// Initializes the 2d array with 0s
		for (i = 0; i < board.ROWS; i++) {
			gameGrid[i] = [];
			var j;
			for (j = 0; j < board.COLUMNS; j++) {
				gameGrid[i].push(0);
			}
		}
	}
	
	// Returns true if current column is not yet full; otherwise return false
	this.isColAvailable = function(col) {
		if (gameGrid[0][col] == 0) {
			return true;
		}
		return false;
	}
	
	// Determines the first empty row in the current column
	this.firstFreeRow = function(col, player) {
		var currentRow = board.ROWS - 1;
		var i;
		
		for (i = currentRow; i >= 0; i--) {
			if (gameGrid[i][col] == 0) { // row is empty
				currentRow = i;
				break;
			}
		}
		
		if (currentRow == 0) {
			// topmost row is filled, mark the column as full
		    fullColumn.push(col);
		}
		
		gameGrid[currentRow][col] = player;
		return currentRow;
	}

	this.checkWinningPatterns = function(row, col) {
		// check horizontal
		if (checkAdjacent(row, col, 0, 1) + checkAdjacent(row, col, 0, -1) > 2) {
			return gameStates.WIN;
		} 
		// check vertical: only downward direction is checked
		else if (checkAdjacent(row, col, 1, 0) > 2) {
			return gameStates.WIN;
		} 
		// check diagonal: southeast and northwest
		else if (checkAdjacent(row, col, -1, 1) + checkAdjacent(row, col, 1, -1) > 2) {
			return gameStates.WIN;
		} 
		// check diagonal: southwest and northeast 
		else if (checkAdjacent(row, col, -1, -1) + checkAdjacent(row, col, 1, 1) > 2) {
			return gameStates.WIN;
		} 
		else {
			// grid is full; no winner
			if (fullColumn.length == board.COLUMNS) {
				return gameStates.DRAW;
			}
			// no winner yet
			return gameStates.CONTINUE;
		}
	}

	// Checks if 2 adjacent cells are of the same value given the coordinates and the directions
	function checkAdjacent(row, col, rowDir, colDir) {
		if (getCellVal(row, col) == getCellVal(row + rowDir, col + colDir)) {
			return 1 + checkAdjacent(row + rowDir, col + colDir, rowDir, colDir);
		} 
		else {
			return 0;
		}
	}
	
	// Returns the value of the cell
	function getCellVal(row, col) {
		if (gameGrid[row] == undefined || gameGrid[row][col] == undefined) {
			return -1;
		} else {
			return gameGrid[row][col];
		}
	}
}
 