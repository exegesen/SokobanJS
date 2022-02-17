const EMPTY = 'empty';
const WALL = 'wall';
const BLOCK = 'block';
const SUCCESS_BLOCK = 'sblock';
const VOID = 'void';
const PLAYER = 'player';
const FLOOR = 'floor';

const BOARDXMAX = 10;
const BOARDYMAX = BOARDXMAX - 1;

var playerPreviousX = 0;
var playerX = 1;

var playerPreviousY = 0;
var playerY = 1;
var gameBoard;

function createBoard(){
	var board = new Array(BOARDXMAX);
	for(var i=0; i<board.length; i++){
		board[i] = new Array(BOARDYMAX);
	}
	board[playerX][playerY] = PLAYER;
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
			toBeWritten += "<td class='"+ tileType +"'>";
			toBeWritten += "</td>";
		}
		
		toBeWritten += "</tr>";
	}
	
	table.innerHTML = toBeWritten;
}

function move(){
	
	
}

window.onload =  function main() {
	gameBoard = createBoard();
	printBoard(gameBoard);
	document.addEventListener('keyup', (e) => {
		if (e.code === "ArrowRight") {
			if(playerY >= BOARDYMAX){ return;}
			else 
			playerPreviousY = playerY;
			playerY += 1;
		}
		else if (e.code === "ArrowUp") {
			if(playerY < 1){ return;}
			playerPreviousY = playerY;
			playerY -= 1;
		}
		else if (e.code === "ArrowDown") { 
			if(playerX >= BOARDXMAX) {return;}
			else 
			playerPreviousX = playerX;		
			playerX += 1;
		}
		else if (e.code === "ArrowLeft") { 
			if(playerX < 1) {return;}
			else 
			playerPreviousX = playerX;		
			playerX -= 1;
		}
		move();
		document.getElementById('test0').innerHTML = 'playerX = ' + playerX;
		document.getElementById('test1').innerHTML = 'playerY = ' + playerY;
		printBoard(gameBoard);
	});
	
	
}





