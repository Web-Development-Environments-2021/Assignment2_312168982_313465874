let context;
let shape = new Object();

//site data
let connected = true;
let currentUser = 'k';
let currentScreen = 'gamePageD';

//Users Data:
let usernamesID = ['k'];
let usernamesPass = ['k'];
let usernameNumber = 0;


//game data:
let directionPressed;


let keyPressedBool = true;
let keyPressed = '';

let gamestat = 0;
//Game stats:
//0 = live
//1 = time's up
//2 = game lost
//3 = game won

let score=0;
let lives=5;
let time_elapsed = 0;
let time_left = 0;
let interval;
let timeInterval;
let gameMusic = new Audio('Popcorn Original Song.wav');
let winMusic = new Audio('winner');
let LoseMusic = new Audio('Wrong Buzzer Sound Effect');

//board:
let canvasWidth = 901;
let canvasHeight = 520;
let canvasRows = 14;
let canvasColumns = 17;
let board = new Array (14);
let rowsOfBoard = 15;
let colsOfBoard = 12;

//pacman vars:
let pac_color = "yellow";
let pacman_x;
let pacman_y;
let pacmanData = new Object();
pacmanData.mouthStat = "close";
pacmanData.mouthSize = 35;
pacmanData.direction = "right";
pacmanData.directionSize = 90;

pacmanData.eyeRightX = -1;
pacmanData.eyeRightY= 5;

pacmanData.eyeDownX = 6;
pacmanData.eyeDownY= 2;

pacmanData.eyeLeftX = -2;
pacmanData.eyeLeftY= 6;

pacmanData.eyeUpX = 0;
pacmanData.eyeUpY= 0;

pacmanData.eyeX = -6;
pacmanData.eyeY= 0;

pacmanData.movingX = 0;
pacmanData.movingY = 0;

//Monsters Vars:
let monsCount = 2;
let mons;

let monsRedPic = document.createElement("img");
let monsBluePic = document.createElement("img");
let monsYellowPic = document.createElement("img");
let monspinkPic = document.createElement("img");

monsRedPic.src = 'images/game/redMon.png';
monsBluePic.src = 'images/game/blueMon.png';
monsYellowPic.src = 'images/game/yellowMon.png';
monspinkPic.src = 'images/game/pinkMon.png';

//balls:
let smallBall = [];
let smallBallColor;
let mediumBall = [];
let mediumBallColor;
let bigBall = [];
let bigBallColor;
let ballCount = 50;

//treasure:
let treasure = new Object();
treasure.x = 100;
treasure.y= 100;
let image_treasure = document.createElement("img");
image_treasure.src ='images/money.png';

//Advance:
let medicineCount = 2;
let medicineIMG = document.createElement("img");
medicineIMG.src = 'images/medicine.png';

//clock:
let clockCount = 2;
let clockIMG = document.createElement("img");
clockIMG.src='images/clock.png';


// Values of the numbers in the maze:
// empty = 0
// wall = 1
// smallBall = 2
// medicine = 3
// clock = 4
// monster[0] = 5
// pacman = 6
// mediumBall = 7
// bigBall = 8
// monster[1] = 9
// monster[2] = 10
// monster[3] = 11



// When the site open:
$(document).ready(function() {


	// showing:
	hideAll();
	showScreenMenu();
	$("#RegisterPageDiv").submit(function(e) {
		e.preventDefault();
	});

	$("#loginPageDiv").submit(function(e) {
		e.preventDefault();
	});
	
	$("#gameSetting").submit(function(e) {
		e.preventDefault();
	});

	// canvas:
	canvas = document.getElementById('canvas');
	context = canvas.getContext("2d");
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	context.fillStyle = "red";
	context.rect(0, 0, canvas.width, canvas.height);

	// context.font = "bold 60px Verdana";
	// context.fillStyle="rgb(221, 221, 42)";

	
	// context.beginPath();
	// context.arc(100, 100, 50, 0, 2 * Math.PI, false);
	// context.fillStyle = "rgb(0, 0, 255)";
	// context.fill();

	// context.beginPath();
	// context.arc(100, 100, 50, 0.25 * Math.PI, 1.25 * Math.PI, false);
	// context.fillStyle = "rgb(255, 255, 0)";
	// context.fill();
	// context.beginPath();
	// context.arc(100, 100, 50, 0.75 * Math.PI, 1.75 * Math.PI, false);
	// context.fill();
	// context.beginPath();
	// context.arc(100, 75, 10, 0, 2 * Math.PI, false);
	// context.fillStyle = "rgb(0, 0, 0)";
	// context.fill();
	
	let grd = context.createRadialGradient(75, 50, 5, 90, 60, 100);
	grd.addColorStop(0, "yellow");
	grd.addColorStop(1, "white");

	// context.fillText("Menu Setting", canvas.width/4, canvas.height); 

	// gameMusic.play();
	// gameMusic.loop();
 
	

});


//change screens:

function hideAll(){
	$('#welcomePage').css('display','none');
	$('#RegisterPageDiv').css('display','none');
	$('#loginPageDiv').css('display','none');
	$('#GamePageDiv').css('display','none');
	$('#stats').css('display','none');
	$('#gameSetting').css('display','none');
	$('#welcomePageForConnected').css('display','none');
}

function showScreen(page){
	$('#' + currentScreen).css('display','none');
	$('#' + page).css('display','block');
	currentScreen=page;
	if(currentScreen == 'GamePageDiv'){
		start();
	}
}

function showScreenMenu(){
	$('#' + currentScreen).css('display','none');
	if(connected){
		document.getElementById('welcomeBack').innerHTML = "hello, " + currentUser;
		$('#welcomePageForConnected').css('display','block');
		$('#setSpan').css('display','inline-block');
		$('#regSpan').css('display','none');
		$('#logSpan').css('display','none');
		currentScreen='welcomePageForConnected';
	}
	else{
		$('#welcomePage').css('display','block');
		currentScreen='welcomePage';
	}
}


// validation for register:

function checkUserNameExist(username){
	for(let i=0;i<usernamesID.length;i++){
		if(usernamesID[i] == username){
			return true;
		}
	}
	return false;
}

function checkPassword(username,password){
	for(let i=0;i<usernamesID.length;i++){
		if(usernamesID[i] == username){
			if(usernamesPass[i] == password)
			{
				return true;
			}
			else{
				return false;
			}
		}
	}
	return false;
}

function checkValidRegForm(){
	let validReg = true;
	let usernameVar = document.forms["regForm"]["username"].value;
	let passwordUser = document.forms["regForm"]["password"].value;
	let firstNameUser = document.forms["regForm"]["first-name"].value;
	let lastNameUser = document.forms["regForm"]["last-name"].value;
	let emailUser = document.forms["regForm"]["mail"].value;
	let birthDateUser = document.forms["regForm"]["birthDate"].value;

	let letter = /[a-z,A-Z]/g;
  	let num = /[0-9]/g;
	let letterCheckPass = passwordUser.match(letter);
	let numCheckPass = passwordUser.match(num);
	let numCheckFName = firstNameUser.match(num);
	let numCheckLName = lastNameUser.match(num);

	//check username
	if(usernameVar.length < 1){
		document.getElementById('errName').innerHTML="Username is required";
		validReg=false;
	}
	else if(usernameVar.length > 0 && checkUserNameExist(usernameVar)){
		document.getElementById('errName').innerHTML="Username is exist";
		validReg=false;
	}
	else{
		document.getElementById('errName').innerHTML="";
	}

	//check first name
	if(firstNameUser.length<1){
		document.getElementById('errFirstName').innerHTML="First name is required";
		validReg=false;
	}
	else if(numCheckFName!=null){
		document.getElementById('errFirstName').innerHTML="First name cannot contain numbers";
		validReg=false;
	}
	else{
		document.getElementById('errFirstName').innerHTML="";
	}
	
	
	//check last name
	if(lastNameUser.length<1){
		document.getElementById('errLastName').innerHTML="Last name is required";
		validReg=false;	
	}
	else if(numCheckLName!=null){
			document.getElementById('errLastName').innerHTML="Last name cannot contain numbers";
			validReg=false;
	}	
	else {
		document.getElementById('errLastName').innerHTML="";
	}


	//check password
	if (passwordUser.length <1){
		document.getElementById('errPassword').innerHTML="Password is required";
		validReg=false;
	}

	else if (passwordUser.length < 6 && passwordUser.length >= 1){
		document.getElementById('errPassword').innerHTML="Password must contain at least 6 characters";
		validReg=false;
	}

	else{
		if(letterCheckPass == null || numCheckPass == null){
			document.getElementById('errPassword').innerHTML="Password must contain at least 1 character and 1 number";
			validReg=false;
		}
		else{
			document.getElementById('errPassword').innerHTML="";
		}
	}
	
	//check email - type email so its check it
	if(emailUser.length < 1){
		document.getElementById('errEmail').innerHTML="A valid email address is required";
		validReg=false;
	}

	else{
		document.getElementById('errEmail').innerHTML="";
	}

	//check birthday
	if((new Date(birthDateUser).getTime() > new Date().getTime())){
		document.getElementById('errBirthDate').innerHTML="A valid date is required";
		validReg=false;
	}
	else{
		document.getElementById('errBirthDate').innerHTML="";
	}


	if(validReg == false){
		return false;
	}
	else{
		usernamesID.push(usernameVar);
		usernamesPass.push(passwordUser)
		currentUser = usernameVar;
		connected = true;
		alert("Welcome for the first time, "  + currentUser + "!");
		showScreenMenu();
		return true;
	}
}



function logButtonClick(){
	let x = checkValidLogForm();
	if(x){
		showScreenMenu();
	}
}

function checkValidLogForm(){
	let validLog = true;
	let usernameLogin = document.forms["logForm"]["usernameLog"].value;
	let passwordLogin = document.forms["logForm"]["password"].value;

	if(usernameLogin.length<1){
		document.getElementById('errNameLog').innerHTML="Please enter a username";
		validLog = false;
	}
	else if(!checkUserNameExist(usernameLogin)){
		document.getElementById('errNameLog').innerHTML="Username doesn't exist";
		validLog = false;
	}
	else{
		document.getElementById('errNameLog').innerHTML="";
	}
	if(passwordLogin.length < 1){
		document.getElementById('errPasswordLog').innerHTML="Please enter a password";
		validLog = false;
	}
	else if(!checkPassword(usernameLogin,passwordLogin)){
		document.getElementById('errPasswordLog').innerHTML="Wrong password";
		validLog = false;
	}

	if(!validLog){
		return false;
	}
	else{
		currentUser = usernameLogin;
		connected = true;
		alert("Welcome back "  + currentUser + "!");
		showScreenMenu();
		return true;
	}
	
}


// --------------------------------------------------------------------------------------------------------
// Settings Page:

function stopMusic(){
	gameMusic.pause();
}


function uniKeyCode1(event) {
	let key = event.key;
  $("#keyup").val(key);
}
function uniKeyCode2(event) {
	let key = event.key;
  $("#keydown").val(key);
}
function uniKeyCode3(event) {
	let key = event.key;
  $("#keyLeft").val(key);
}
function uniKeyCode4(event) {
	let key = event.key;
  $("#keyRight").val(key);
}

function checkValidSettingForm(){
	let validLog = true;
	let keyUpT = document.forms["settingForm"]["keyUp"].value;
	let keyDownT = document.forms["settingForm"]["keyDown"].value;
	let keyLeftT = document.forms["settingForm"]["keyLeft"].value;
	let keyRightT = document.forms["settingForm"]["keyRight"].value;
	let ballCountT = document.forms["settingForm"]["NumeberBalls"].value;
	let smallBallColorT = document.forms["settingForm"]["smallBallColor"].value;
	let mediumBallColorT = document.forms["settingForm"]["mediumBallColor"].value;
	let bigBallColorT = document.forms["settingForm"]["bigBallColor"].value;
	let time_elapsedT = document.forms["settingForm"]["timeElapse"].value;
	let monsCountT= document.getElementById("noMonsters").value;
	
	let letter = /[a-z,A-Z]/g;
	let letterCheckPass = time_elapsedT.match(letter);

	if(keyUpT=='' || keyUpT==keyLeftT || keyUpT==keyDownT || keyUpT==keyRightT){
		document.getElementById('keyUpErr').innerHTML="*";
		validLog = false;
	}
	else{
		document.getElementById('keyUpErr').innerHTML="";
	}
	if(keyDownT=='' || keyDownT==keyLeftT || keyDownT==keyUpT || keyDownT==keyRightT){
		document.getElementById('keyDownErr').innerHTML="*";
		validLog = false;
	}
	else{
		document.getElementById('keyDownErr').innerHTML="";
	}
	if(keyLeftT=='' || keyLeftT==keyDownT || keyLeftT==keyUpT || keyLeftT==keyRightT){
		document.getElementById('keyLeftErr').innerHTML="*";
		validLog = false;
	}
	else{
		document.getElementById('keyLeftErr').innerHTML="";
	}
	if(keyRightT=='' || keyRightT==keyDownT || keyRightT==keyUpT || keyRightT==keyLeftT){
		document.getElementById('keyRightErr').innerHTML="*";
		validLog = false;
	}
	else{
		document.getElementById('keyRightErr').innerHTML="";
	}

	if(time_elapsedT<60 || time_elapsedT==null || letterCheckPass!=null){
		document.getElementById('timeElapseErr').innerHTML="*";
		validLog = false;
	}
	else{
		document.getElementById('timeElapseErr').innerHTML="";
	}
	if(!validLog){
		return false;
	}
	else{
		keyUp = keyUpT
		keyDown = keyDownT
		keyLeft = keyLeftT 
		keyRight = keyRightT
		ballCount = ballCountT
		smallBallColor = smallBallColorT 
		mediumBallColor = mediumBallColorT
		bigBallColor = bigBallColorT
		time_elapsed = time_elapsedT
		monsCount = monsCountT
		document.getElementById('keyUpGameTable').innerHTML = keyUp;
		document.getElementById('keyDownGameTable').innerHTML = keyDown;
		document.getElementById('keyLeftGameTable').innerHTML = keyLeft;
		document.getElementById('keyRightGameTable').innerHTML = keyRight;
		document.getElementById('noBallsGameTable').innerHTML = ballCount;
		document.getElementById('smallBallsGameTable').innerHTML = smallBallColor;
		document.getElementById('smallBallsGameTable').style = "background-color:"+document.getElementById('smallBallsGameTable').innerHTML;
		document.getElementById('mediunBallsGameTable').innerHTML = mediumBallColor;
		document.getElementById('mediunBallsGameTable').style = "background-color:"+document.getElementById('mediunBallsGameTable').innerHTML;
		document.getElementById('largeBallsGameTable').innerHTML = bigBallColor;
		document.getElementById('largeBallsGameTable').style = "background-color:"+document.getElementById('largeBallsGameTable').innerHTML;
		document.getElementById('timeGameTable').innerHTML = time_elapsed;
		document.getElementById('noMonstersGameTable').innerHTML = monsCount;
		showScreen('GamePageDiv');
		return true;
	}
}

function generateRandomSetting(){
	$("#keyup").val("ArrowUp");
	$("#keydown").val("ArrowDown");
	$("#keyleft").val("ArrowLeft");
	$("#keyright").val("ArrowRight");
	$("#NumeberBallsID").val(Math.floor(Math.random() * 40) + 50);

	// document.getElementById('smallBallsGameTable').innerHTML=Math.floor(Math.random()*16777215);
	// $("#smallBallColor").innerHTML = "#"+Math.floor(Math.random()*16777215);
	// document.getElementById('smallBallColor').style = "background-color:"+document.getElementById('smallBallColor').innerHTML;
	// document.getElementById('smallBallColor').style = "background-color:"+"#"+Math.floor(Math.random()*16777215).toString(16);
	
	$("#smallBallColor").val("#"+Math.floor(Math.random()*16777215));
	$("#mediumBallColor").val("#"+Math.floor(Math.random()*16777215));
	$("#bigBallColor").val("#"+Math.floor(Math.random()*16777215));
 	
	$("#timeGame").val(Math.floor(Math.random() * 120) + 60);
	$("#noMonsters").val(Math.floor(Math.random() * 4) + 1);
	return false;
}



// Generate new Game:

function genBoard(){
	for(let i=0;i<14;i++){
		board[i] = new Array(17);
		for(let j = 0; j< 17 ; j++){
			
			board[i][j] = 0;
		}
	}
}

function setWalls(){

	for (let borderRow = 0; borderRow<14; borderRow++){
		for(let borderCol = 0; borderCol<17; borderCol++){
			if(borderRow == 0 || borderRow == 13|| borderCol == 0 || borderCol == 16){
				board[borderRow][borderCol] = 1;
			}
		}
	}
	board[1][2]=1;
	board[1][3]=1;
	board[1][4]=1;
	board[1][12]=1;
	board[1][13]=1;
	board[1][14]=1;
	board[2][3]=1;
	board[2][4]=1;
	board[2][13]=1;
	board[3][3]=1;
	board[3][8]=1;
	board[3][11]=1;
	board[3][13]=1;
	board[4][7]=1;
	board[4][8]=1;
	board[4][9]=1;
	board[4][11]=1;
	board[5][7]=1;
	board[5][8]=1;
	board[5][9]=1;
	board[5][11]=1;
	board[6][3]=1;
	board[6][11]=1;
	board[6][14]=1;
	board[7][3]=1;
	board[7][14]=1;
	board[8][1]=1;
	board[8][2]=1;
	board[8][3]=1;
	board[8][5]=1;
	board[8][7]=1;
	board[8][8]=1;
	board[8][9]=1;
	board[8][14]=1;
	board[9][2]=1;
	board[9][5]=1;
	board[9][7]=1;
	board[9][8]=1;
	board[9][9]=1;
	board[9][14]=1;
	board[10][8]=1;
	board[11][3]=1;
	board[11][8]=1;
	board[11][11]=1;
	board[11][12]=1;
	board[11][13]=1;
	board[12][3]=1;
	board[12][4]=1;
}

function isEmpty(cellRow, cellCol){
	if(board[cellRow][cellCol] == 0){
		return true;
	}
	return false;
}

function randomFreeCell(){
	let cellRow = Math.floor(Math.random()*12+1);
	let cellCol = Math.floor(Math.random()*15+1);
	while(!isEmpty(cellRow,cellCol)){
	cellRow = Math.floor(Math.random()*12+1);
	cellCol = Math.floor(Math.random()*15+1);
	}
	return [cellRow,cellCol];
}

function setBalls(){
	let smallBallCount = ballCount * 0.6;
	let mediumBallCount = ballCount * 0.3;
	let bigBallCount = ballCount - smallBallCount - mediumBallCount;
	for (let i = 0; i< smallBallCount; i++){
		let cell = randomFreeCell();
		board[cell[0]][cell[1]] = 2;
	}
	for (let j = 0; j< mediumBallCount; j++){
		let cell = randomFreeCell();
		board[cell[0]][cell[1]] = 7;
	}
	for (let k = 0; k< bigBallCount; k++){
		let cell = randomFreeCell();
		board[cell[0]][cell[1]] = 8;
	}
}

function setMedicine(){
	for (let i = 0; i< medicineCount; i++){
		let cell = randomFreeCell();
		board[cell[0]][cell[1]] = 3;
	}
}

function setClock(){
	for (let i = 0; i< clockCount; i++){
		let cell = randomFreeCell();
		board[cell[0]][cell[1]] = 4;
	}
}

function setMons(){
	mons = new Array(monsCount);
	mons[0] = new Object();
	mons[0].x = 0;
	mons[0].y = 0;
	board[1][1] = 5;
	if(monsCount > 1){
		board[1][15] = 9;
		mons[1] = new Object();
		mons[1].x = 0;
		mons[1].y = 0;
	}
	if(monsCount > 2){
		board[12][1] = 10;
		mons[2] = new Object();
		mons[2].x = 0;
		mons[2].y = 0;
	}
	if(monsCount > 3){
		board[12][15] = 11;
		mons[3] = new Object();
		mons[3].x = 0;
		mons[3].y = 0;
	}
}

function setPacman(){
	let cell = randomFreeCell();
	board[cell[0]][cell[1]] = 6;
}


function start() {
	window.clearInterval(interval);
	window.clearInterval(timeInterval);
	gamestat = 0;
	keyPressed = ''
	keyPressedBool = false;
	score = 0;
	time_left = time_elapsed;
	pac_color = "yellow";
	shape.direction = "rght";
	start_time = new Date();
	genBoard();
	setWalls();
	setBalls();
	
	// gameMusic.play();
	// gameMusic.loop();
	setMedicine();
	setClock();
	setMons();
	setPacman();
	Draw();
	
	addEventListener(
		"keydown",
		function(e) {
			keyPressed = e.key;
			keyPressedBool = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keyPressed = e.key;
			keyPressedBool = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 10);
	// timeInterval = setInterval(function () { time_left-- }, 1000);
}

function Draw() {
	canvas.width = canvas.width; //clean board
	for (let i = 0; i < canvasRows; i++) {
		for (let j = 0; j < canvasColumns; j++) {
			let center = new Object();
			center.x = i * (canvasWidth/canvasRows) + (canvasWidth/(2*canvasRows));
			center.y = j * (canvasHeight/canvasColumns) + (canvasHeight/(2*canvasColumns));
			
			
			//Wall: 
			if (board[i][j] == 1) {
				context.beginPath();
				context.rect(center.x - (canvasWidth/(2*canvasRows)), center.y - (canvasHeight/(2*canvasColumns)), (canvasWidth/canvasRows), (canvasHeight/canvasColumns));
				context.fillStyle = "black"; //color
				context.fill();
			}
 
			// //smallBall
			else if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 4, 0, 2 * Math.PI); // circle
				context.fillStyle = smallBallColor; //color
				context.fill();
			}

			// //mediumBall
			else if (board[i][j] == 7) {
				context.beginPath();
				context.arc(center.x, center.y, 6, 0, 2 * Math.PI); // circle
				context.fillStyle = mediumBallColor; //color
				context.fill();
			}
			
			// //bigBall
			else if (board[i][j] == 8) {
				context.beginPath();
				context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
				context.fillStyle = bigBallColor; //color
				context.fill();
			}

			//medicine
			else if (board[i][j] == 3) {
				context.drawImage(medicineIMG, (center.x - (canvasWidth/(4*canvasRows))), (center.y - (canvasHeight/(4*canvasColumns))), (canvasWidth/(2*canvasRows)), (canvasHeight/(2*canvasColumns))); // medicine picture
			}

			//clock
			else if (board[i][j] == 4) {
				context.drawImage(clockIMG, (center.x - (canvasWidth/(3*canvasRows))), (center.y - (canvasHeight/(3*canvasColumns))), (2*canvasWidth/(3*canvasRows)), (2*canvasHeight/(3*canvasColumns))); // medicine picture
				
			}

			//mons[0]:
			else if (board[i][j] == 5) {
				context.drawImage(monsRedPic, (center.x - (canvasWidth/(4*canvasRows))), (center.y - (canvasHeight/(4*canvasColumns))), (canvasWidth/(2*canvasRows)), (3*canvasHeight/(4*canvasColumns)));
			}
			//mons[1]:
			else if (board[i][j] == 9) {
				context.drawImage(monsBluePic, (center.x - (canvasWidth/(4*canvasRows))), (center.y - (canvasHeight/(4*canvasColumns))), (canvasWidth/(2*canvasRows)), (3*canvasHeight/(4*canvasColumns)));
			}
			//mons[2]:
			else if (board[i][j] == 10) {
				context.drawImage(monsYellowPic, (center.x - (canvasWidth/(4*canvasRows))), (center.y - (canvasHeight/(4*canvasColumns))), (canvasWidth/(2*canvasRows)), (3*canvasHeight/(4*canvasColumns)));
			}
			//mons[3]:
			else if (board[i][j] == 11) {
				context.drawImage(monspinkPic, (center.x - (canvasWidth/(4*canvasRows))), (center.y - (canvasHeight/(4*canvasColumns))), (canvasWidth/(2*canvasRows)), (3*canvasHeight/(4*canvasColumns)));
			}

			//Pacman Draw:
			else if (board[i][j] == 6) {
				pacman_x = center.x;
				pacman_y = center.y;
				context.beginPath();
				context.arc(center.x+ pacmanData.movingX, center.y + pacmanData.movingY, 15, (pacmanData.mouthSize + pacmanData.directionSize) * Math.PI/180,(2*Math.PI - ((pacmanData.mouthSize - pacmanData.directionSize) * Math.PI/180))); // half circle
				context.lineTo(center.x + pacmanData.movingX , center.y+ pacmanData.movingY);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + pacmanData.movingX + pacmanData.eyeX, center.y + pacmanData.movingY - pacmanData.eyeY, 2, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			}

			//treasure:
			context.drawImage(image_treasure, treasure.x, treasure.y, (2*canvasWidth/(3*canvasRows)), (2*canvasHeight/(3*canvasColumns))); // treasure picture
		}
	}
}

function endgameNoHearts(){
	window.clearInterval(interval);
	window.clearInterval(interval);
	window.clearInterval(timeInterval);
	alert("You Lost!");
	showScreen('gameSetting');
}

function endgameNoTimeLeft(){
	window.clearInterval(interval);
	window.clearInterval(interval);
	window.clearInterval(timeInterval);
	alert("You Lost!");
	showScreen('gameSetting');
}

function endgameWon(){
	window.clearInterval(interval);
	window.clearInterval(interval);
	window.clearInterval(timeInterval);
	alert("You Won!");
	showScreen('gameSetting');
}


function moveEyePacman(directionPac){
	if(directionPac == "right"){
		pacmanData.eyeX = pacmanData.eyeRightX;
		pacmanData.eyeY = pacmanData.eyeRightY;
	}
	else if(directionPac == "down"){
		pacmanData.eyeX = pacmanData.eyeDownX;
		pacmanData.eyeY = pacmanData.eyeDownY;
	}
	else if(directionPac == "left"){
		pacmanData.eyeX =pacmanData.eyeLeftX;
		pacmanData.eyeY = pacmanData.eyeY;
	}
	else if (directionPac == "up"){
		pacmanData.eyeX = pacmanData.eyeUpX;
		pacmanData.eyeY = pacmanData.eyeUpY;
	}
}

function movePacman(directionPac){
	pacmanData.direction = directionPac;
	moveEyePacman(directionPac);
	if(directionPac == "right"){
		pacmanData.directionSize = 0;
		pacmanData.movingX = pacmanData.movingX+0.5;
	}
	else if(directionPac == "down"){
		pacmanData.directionSize = 90;
		pacmanData.movingY = pacmanData.movingY+0.5;
	}
	else if(directionPac == "left"){
		pacmanData.directionSize = 180;
		pacmanData.movingX = pacmanData.movingX-0.5;
	}
	else if (directionPac == "up"){
		pacmanData.directionSize = 270;
		pacmanData.movingY = pacmanData.movingY-0.5;
	}
}

function calculateDirectionMonster(monster){
	if(pacman_x > monster.x){
		if(pacman_y>monster.y){
			return "up-right";
		}
		else if(pacman_y == monster.y){
			return "right";
		}
		else{
			return "down-right";
		}
	}
	if(pacman_x == monster.x){
		if(pacman_y>monster.y){
			return "up";
		}
		else if(pacman_y < monster.y){
			return "down";
		}
	}
	else{
		if(pacman_y>monster.y){
			return "up-left";
		}
		else if(pacman_y == monster.y){
			return "left";
		}
		else{
			return "down-left";
		}
	}
}

function moveMonsters(monster){
	mons[0].direction = calculateDirectionMonster(mons[0]);
	
}


function pacmanMouthChange(){
	if (pacmanData.mouthSize == 0){
		pacmanData.mouthStat = "open";
	}
	if (pacmanData.mouthSize == 35){
		pacmanData.mouthStat = "close";
	}
	
	if (pacmanData.mouthStat == "open"){
		pacmanData.mouthStat++;
	}
	else{
		pacmanData.mouthStat++;
	}
}

function endgameExitGame(){
	window.clearInterval(interval);
	window.clearInterval(interval);
	window.clearInterval(timeInterval);
	alert("Game Finished");
	showScreen('gameSetting');
}

function GetKeyPressed() {
	document.getElementById('keyUpGameTable').innerHTML = (keyPressedBool);
	if (keyPressed == keyRight && keyPressedBool == true) {
		return "right";
	}
	if (keyPressed == keyDown && keyPressedBool == true) {
		return "down";
	}
	if (keyPressed == keyLeft && keyPressedBool == true) {
		return "left";
	}
	if (keyPressed == keyUp && keyPressedBool == true) {
		return "up";
	}
	if (keyPressed == 'Escape' && keyPressedBool == true) {
		gamestat = 4;
		return pacmanData.direction;
	}
}


function UpdatePosition() {
	if(gamestat == 1){
		endgameNoHearts();
	}

	if(gamestat == 2){
		endgameNoHearts();
	}

	if(gamestat == 3){
		endgameWon();
	}
	if(gamestat == 4){
		endgameExitGame();
	}
	let x = GetKeyPressed();
	pacmanMouthChange();
	movePacman(x);
	Draw();
	// if (x == 1) {
	// 	if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
	// 		shape.j--;
	// 	}
	// }
	// if (x == 2) {
	// 	if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
	// 		shape.j++;
	// 	}
	// }
	// if (x == 3) {
	// 	if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
	// 		shape.i--;
	// 	}
	// }
	// if (x == 4) {
	// 	if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
	// 		shape.i++;
	// 	}
	// }
	// if (board[shape.i][shape.j] == 1) {
	// 	score++;
	// }
	// board[shape.i][shape.j] = 2;
	// var currentTime = new Date();
	// time_elapsed = (currentTime - start_time) / 1000;
	// if (score >= 20 && time_elapsed <= 10) {
	// 	pac_color = "green";
	// }
	// if (score == 50) {
	// 	window.clearInterval(interval);
	// 	window.alert("Game completed");
	// } else {
	// 	Draw();
	// }

	
}


