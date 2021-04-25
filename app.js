let context;
let shape = new Object();



var regOK = 'false';

//game:
let gameKeys = {"keyUp":"", "keyDown":"", "keyLeft":"", "keyRight":""}

let score=0;
let lives=5;
let start_time=0;
let time_elapsed;
let interval;
let gameMusic = new Audio('Popcorn Original Song.wav');

//board:
let board = new Array (15);
let sizeX = 1000/board.length;
let sizeY = 500/12;

//pacman vars:
let pac_color;
let pacman_x;
let pacman_y;

//fruits:
let smallFruit_x;
let smallFruit_y;

let middleFruit_x;
let middleFruit_y;

let bigFruit_x;
let bigFruit_y;
let candies = 0;

$(document).ready(function() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext("2d");
	canvas.width = "1240";
	canvas.height = "580";

	context.font = "bold 60px Verdana";
	context.fillStyle="rgb(221, 221, 42)";
	//context.strokeRect(10,10,50,50);
	context.textAlign = "center";
	
	//context = document.getElementById('menu').style.fontStyle.fontSize="50px";




	Start(); 
	

});




// Generate new Game:

function genBoard(){
	for(let i=0;i<board.length;i++){
		board[i] = new Array(10)
		for(let j = 0; j< 10 ; j++){
			board[i][j] = 0;
		}
	}
}

function setWalls(){
	board[0][1]=1;
	board[0][2]=1;
	board[0][3]=1;
	board[0][11]=1;
	board[0][12]=1;
	board[0][13]=1;
	board[1][2]=1;
	board[1][7]=1;
	board[1][12]=1;
	board[2][2]=1;
	board[2][7]=1;
	board[2][10]=1;
	board[2][12]=1;
	board[2][14]=1;
	board[3][6]=1;
	board[3][7]=1;
	board[3][8]=1;
	board[3][10]=1;
	board[3][14]=1;
	board[4][6]=1;
	board[4][7]=1;
	board[4][8]=1;
	board[4][10]=1;
	board[5][2]=1;
	board[5][3]=1;
	board[5][4]=1;
	board[5][5]=1;
	board[5][10]=1;
	board[5][13]=1;
	board[6][2]=1;
	board[6][5]=1;
	board[6][13]=1;
	board[6][14]=1;
	board[7][0]=1;
	board[7][1]=1;
	board[7][2]=1;
	board[7][4]=1;
	board[7][6]=1;
	board[7][7]=1;
	board[7][8]=1;
	board[7][13]=1;
	board[8][1]=1;
	board[8][4]=1;
	board[8][6]=1;
	board[8][7]=1;
	board[8][8]=1;
	board[8][13]=1;
	board[9][7]=1;
	board[10][2]=1;
	board[10][7]=1;
	board[10][10]=1;
	board[10][12]=1;
	board[10][14]=1;
	board[11][2]=1;
	board[11][3]=1;
	board[11][9]=1;
	board[11][10]=1;
	board[11][11]=1;
	board[11][12]=1;
}





















function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}

	
}


