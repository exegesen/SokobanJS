const EMPTY = 'empty';
const WALL = 'wall';
const BLOCK = 'block';
const SUCCESS_BLOCK = 'sblock';
const VOID = 'void';
const PLAYER = 'player';
const FLOOR = 'floor';
const POOTIS = 'pootis';

const BOARDXMAX = 10;
const BOARDYMAX = BOARDXMAX - 1;


var playerX = 3;
var playerPreviousX = playerX;


var playerY = 3;
var playerPreviousY = playerY;
var gameBoard;
var movedOverBlock = FLOOR;

function createBoard(){
	var board = new Array(BOARDXMAX);
	for(var i=0; i<board.length; i++){
		board[i] = new Array(BOARDYMAX);
	}
	
	for(var i=0; i<board.length; i++){
		for(var j=0; j<board.length; j++){
			if(i == 0 || i == board.length-1 || j == 0 || j == board.length-1){
				board[i][j] = WALL;
			}
			else{
				board[i][j] = FLOOR;
			}
		}
	}
	movedOverBlock = FLOOR;
	board[playerX][playerY] = PLAYER;
	board[4][4] = BLOCK;
	board[5][8] = POOTIS;
	console.log(board);
	return board;
}

function printBoard(bboard){
	var table = document.getElementById("table");
	var toBeWritten = '';
	var tileType;
	for(var i=0; i<bboard.length; i++){
		toBeWritten += "<tr>";
		for(var j=0; j<bboard.length; j++){
			if(bboard[i][j] == PLAYER){
				tileType = PLAYER;
			}
			else if(bboard[i][j]== WALL){
				tileType = WALL;
			} 
			else if(bboard[i][j] == FLOOR){
				tileType = FLOOR;
			}
			else if(bboard[i][j] == BLOCK){
				tileType = BLOCK;
			}
			else if(bboard[i][j] == SUCCESS_BLOCK){
				tileType = SUCCESS_BLOCK;
			}
			else if(bboard[i][j] == EMPTY){
				tileType = EMPTY;
			}
			else if(bboard[i][j] == VOID){
				tileType = VOID;
			}
			else if(bboard[i][j] == POOTIS){
				tileType = POOTIS;
			}
			toBeWritten += "<td class='"+ tileType +"'>";
			toBeWritten += "</td>";
		}
		
		toBeWritten += "</tr>";
	}
	
	table.innerHTML = toBeWritten;
}


function move(){
	
	if(gameBoard[playerX][playerY] == WALL || gameBoard[playerX][playerY] == EMPTY || gameBoard[playerX][playerY] == VOID){
		//Can't move into walls!
		playerY = playerPreviousY;
		playerX = playerPreviousX;
		return;
	}
	else 
	if(gameBoard[playerX][playerY] == POOTIS){
		movedOverBlock = POOTIS;
	}
	else if(gameBoard[playerX][playerY] == FLOOR){
		movedOverBlock = FLOOR;
	}
	else if(gameBoard[playerX][playerY] == BLOCK){
		movedOverBlock = FLOOR;
		var dx = playerX-playerPreviousX;
		var dy = playerY-playerPreviousY;
		gameBoard[playerX+dx][playerY+dy] = BLOCK;
		
	}
	gameBoard[playerPreviousX][playerPreviousY] = movedOverBlock;
	gameBoard[playerX][playerY] = PLAYER;
	
}

window.onload =  function main() {
	gameBoard = createBoard();
	printBoard(gameBoard);
	document.getElementById('test0').innerHTML = 'playerX = ' + playerX;
	document.getElementById('test1').innerHTML = 'playerY = ' + playerY;
	document.getElementById('test2').innerHTML = 'playerPreviousX = ' + playerPreviousX;
	document.getElementById('test3').innerHTML = 'playerPreviousY = ' + playerPreviousY;
	document.addEventListener('keyup', (e) => {
		if (e.code === "ArrowRight") {
			playerPreviousY = playerY;
			playerPreviousX = playerX;
			playerY += 1;
		}
		else if (e.code === "ArrowLeft") {
			playerPreviousY = playerY;
			playerPreviousX = playerX;
			playerY -= 1;
		}
		else if (e.code === "ArrowDown") { 	
			playerPreviousX = playerX;
			playerPreviousY = playerY;
			playerX += 1;
		}
		else if (e.code === "ArrowUp") { 
			playerPreviousX = playerX;
			playerPreviousY = playerY;
			playerX -= 1;
		}
		
		document.getElementById('test0').innerHTML = 'playerX = ' + playerX;
		document.getElementById('test1').innerHTML = 'playerY = ' + playerY;
		document.getElementById('test2').innerHTML = 'playerPreviousX = ' + playerPreviousX;
		document.getElementById('test3').innerHTML = 'playerPreviousY = ' + playerPreviousY;
		move();
		printBoard(gameBoard);
	});
	
	
}





