
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
	
	return tileMap01.mapGrid;
	
}

function printBoard(bboard){
	var table = document.getElementById("table");
	var toBeWritten = '';
	var tileType;
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
				var isGoalPost = tileMapNoEntities.mapGrid[i][j] == "G";
				if(isGoalPost){
					tileType = Entities.BlockDone;
					
				}
				console.log(tileType);
			}
			toBeWritten += "<td class='"+ tileType +"'>";
			toBeWritten += "</td>";
		}
		
		toBeWritten += "</tr>";
	}
	
	table.innerHTML = toBeWritten;
}

function NAND(a, b) {
  return !(a && b)
}



var floorUp = '';
var floorDown = '';
var floorLeft = '';
var floorRight = '';
var tileJustWasAt = ' ';
var tileJustMovedTo = ' ';
function move(){
	
	tileJustWasAt = tileJustMovedTo;
	if(gameBoard[playerX][playerY] == "W"){
		//Can't move into walls!
		playerY = playerPreviousY;
		playerX = playerPreviousX;
		return;
	}
	else if(gameBoard[playerX][playerY] == 'G'){
		//Moved over goalpost
		tileJustMovedTo = "G";
	}
	else if(gameBoard[playerX][playerY] == ' '){
		//Moved over space/floor
		tileJustMovedTo = " ";
	}
	else if(gameBoard[playerX][playerY] == 'B'){
		//move box part
		dy = playerPreviousY - playerY;
		dx = playerPreviousX - playerX;
		/*if(gameBoard[playerX+2*dx][playerY+2*dy] != ' '){*/
		var c = gameBoard[playerX-dx][playerY-dy];
		
		var bool1 = (c != ' ');
		
		var bool2 = (c != 'G');
		
				
		if( !(bool1 || bool2)) {
			//Can't pull boxes or push 2 boxes at same time
			playerY = playerPreviousY;
			playerX = playerPreviousX;
			return;
		} 
		else{
			gameBoard[playerX][playerY] = 'P';
			//document.getElementById('test7').innerHTML = "Intended Box Position: x: " + playerX-dx + "y: " + playerY-dy;
			gameBoard[playerX-dx][playerY-dy] = 'B';
			
			gameBoard[playerPreviousX][playerPreviousY] = tileMapNoEntities.mapGrid[playerPreviousX][playerPreviousY];
			
			
			
			dy = 0; dx = 0;
			return;
		}
		
		
		
	}
	
	gameBoard[playerX][playerY] = "P"; // tile moving to set player texture
	gameBoard[playerPreviousX][playerPreviousY] = tileMapNoEntities.mapGrid[playerPreviousX][playerPreviousY];
	
	//debug statements
	/*
	floorUp = gameBoard[playerX-1][playerY];
	floorDown = gameBoard[playerX+1][playerY];
	floorLeft = gameBoard[playerX][playerY-1];
	floorRight = gameBoard[playerX][playerY+1];
	document.getElementById('test7').innerHTML = "floorUp " + floorUp;
	document.getElementById('test8').innerHTML = "floorDown " + floorDown;
	document.getElementById('test9').innerHTML = "floorLeft " + floorLeft;
	document.getElementById('test10').innerHTML = "floorRight " + floorRight;
	*/
	
	
}

function checkWinCondition(){
	/*
	if(gameBoard[5][8] == BLOCK){
		document.getElementById('test4').innerHTML = 'Game WON!';
		gameBoard[5][8] = SUCCESS_BLOCK;
	}
	*/
	
}
function isBoxSbox(){
	
	for(var i=0; i<BOARDYMAX; i++){
		for(var j=0; j<BOARDXMAX; j++){
			
		}
	
	}
	
}
window.onload =  function main() {
	gameBoard = createBoard();
	printBoard(gameBoard);
	/*
	document.getElementById('test0').innerHTML = 'playerX = ' + playerX;
	document.getElementById('test1').innerHTML = 'playerY = ' + playerY;
	document.getElementById('test2').innerHTML = 'playerPreviousX = ' + playerPreviousX;
	document.getElementById('test3').innerHTML = 'playerPreviousY = ' + playerPreviousY;
	
	document.getElementById('test7').innerHTML = "floorUp " + floorUp;
	document.getElementById('test8').innerHTML = "floorDown " + floorDown;
	document.getElementById('test9').innerHTML = "floorLeft " + floorLeft;
	document.getElementById('test10').innerHTML = "floorRight " + floorRight;
	*/	
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
		/*
		document.getElementById('test0').innerHTML = 'playerX = ' + playerX;
		document.getElementById('test1').innerHTML = 'playerY = ' + playerY;
		document.getElementById('test2').innerHTML = 'playerPreviousX = ' + playerPreviousX;
		document.getElementById('test3').innerHTML = 'playerPreviousY = ' + playerPreviousY;
		*/
		move();
		checkWinCondition()
		printBoard(gameBoard);
	});
	
	
}

var tileMapNoEntities = {
  width: 19,
  height: 16,
  mapGrid: [
    [
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      [" "],
      [" "],
      ["W"],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      ["W"],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      [" "],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
    ],
    [
      ["W"],
      [" "],
      [" "],
      [" "],
      ["W"],
      [" "],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      [" "],
      ["G"],
      ["G"],
      ["W"],
    ],
    [
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      ["G"],
      ["G"],
      ["W"],
    ],
    [
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      ["W"],
      [" "],
      ["W"],
      ["W"],
      [" "],
      [" "],
      ["G"],
      ["G"],
      ["W"],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      ["W"],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
    [
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
      [" "],
    ],
  ],
};





