
const BOARDXMAX = 19;
const BOARDYMAX = 16;

var floorUnderCharacter = '';
var playerX = 11;
var playerPreviousX = 0;

var playerY = 11;
var playerPreviousY = 0;

var gameBoard;
var movedOverBlock = " ";

function createBoard(){
	console.log(tileMap01.mapGrid);
	return tileMap01.mapGrid;
	
}

function printBoard(bboard){
	console.log(bboard);
	var table = document.getElementById("table");
	var toBeWritten = '';
	var tileType;
	
	const WALL = 'W';
	
	
	
	for(var i=0; i<BOARDYMAX; i++){
		toBeWritten += "<tr>";
		for(var j=0; j<BOARDXMAX; j++){
			
			if(bboard[i][j] == "W"){
				tileType = Tiles.Wall;
			}
			else if(bboard[i][j] == ' '){
				tileType = Tiles.Space;
			}
			else if(bboard[i][j] == "G"){
				tileType = Tiles.Goal;
			}
			else if(bboard[i][j] == "P"){
				tileType = Entities.Character;
			}
			else if(bboard[i][j] == "B"){
				tileType = Entities.Block;
			}
			/*
			else if(bboard[i][j] == Entities.BlockDone){
				tileType = Entities.BlockDone;
			}*/
			
			
			toBeWritten += "<td class='"+ tileType +"'>";
			toBeWritten += "</td>";
		}
		
		toBeWritten += "</tr>";
	}
	
	table.innerHTML = toBeWritten;
}

var floorUp = '';
var floorDown = '';
var floorLeft = '';
var floorRight = '';
var floorPreviouslyAt = '';
function move(){
	floorUp = gameBoard[playerX-1][playerY];
	floorDown = gameBoard[playerX+1][playerY];
	floorLeft = gameBoard[playerX][playerY-1];
	floorRight = gameBoard[playerX][playerY+1];
	
	document.getElementById('test7').innerHTML = "floorUp " + floorUp;
	document.getElementById('test8').innerHTML = "floorDown " + floorDown;
	document.getElementById('test9').innerHTML = "floorLeft " + floorLeft;
	document.getElementById('test10').innerHTML = "floorRight " + floorRight;
	
	if(gameBoard[playerX][playerY] == "W"){
		//Can't move into walls!
		playerY = playerPreviousY;
		playerX = playerPreviousX;
		return;
	}
	else if(gameBoard[playerX][playerY] == "G"){
		//Moved over goalpost
		movedOverBlock = "G";
	}
	else if(gameBoard[playerX][playerY] == " "){
		//Moved over space/floor
		movedOverBlock = " ";
	}
	else if(gameBoard[playerX][playerY] == "B"){
		
	}
	
	gameBoard[playerPreviousX][playerPreviousY] = floorPreviouslyAt;
	document.getElementById('test5').innerHTML = "movedOverBlock: " + movedOverBlock;
	
	floorPreviouslyAt = gameBoard[playerPreviousX][playerPreviousY]
	document.getElementById('test6').innerHTML = "floorPreviouslyAt: " + floorPreviouslyAt;
	
	
	floorUnderCharacter = gameBoard[playerX][playerY];
	document.getElementById('test4').innerHTML = "floorUnderCharacter: " + floorUnderCharacter;
	
	gameBoard[playerX][playerY] = "P";
	
}

function checkWinCondition(){
	/*
	if(gameBoard[5][8] == BLOCK){
		document.getElementById('test4').innerHTML = 'Game WON!';
		gameBoard[5][8] = SUCCESS_BLOCK;
	}
	*/
	
}

window.onload =  function main() {
	gameBoard = createBoard();
	console.log(gameBoard);
	printBoard(gameBoard);
	document.getElementById('test0').innerHTML = 'playerX = ' + playerX;
	document.getElementById('test1').innerHTML = 'playerY = ' + playerY;
	document.getElementById('test2').innerHTML = 'playerPreviousX = ' + playerPreviousX;
	document.getElementById('test3').innerHTML = 'playerPreviousY = ' + playerPreviousY;
	
	document.getElementById('test7').innerHTML = "floorUp " + floorUp;
	document.getElementById('test8').innerHTML = "floorDown " + floorDown;
	document.getElementById('test9').innerHTML = "floorLeft " + floorLeft;
	document.getElementById('test10').innerHTML = "floorRight " + floorRight;
	
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
		checkWinCondition()
		printBoard(gameBoard);
	});
	
	
}





