let context;
let shape = new Object();

//site data
let connected = false;
let currentUser = null;
let currentScreen = 'RegisterPageDiv';

//Users Data:
let usernamesID = ['k','Noya'];
let usernamesPass = ['k','n'];
let usernameNumber = 0;


//game data:
let keyUp;
let keyDown;
let keyLeft;
let keyRight;

let score=0;
let lives=5;
let start_time=0;
let time_elapsed = 0;
let interval;
let gameMusic = new Audio('Popcorn Original Song.wav');

//board:
let board = new Array (14);
let sizeX = 1000/14;
let sizeY = 500/17;
let rowsOfBoard = 15;
let colsOfBoard = 12;

//pacman vars:
let pac_color;
let pacman_x;
let pacman_y;


//Monsters Vars:
let monsCount = 1;
let mons;

//balls:
let smallBall = [];
let smallBallColor;
let mediumBall = [];
let mediumBallColor;
let bigBall = [];
let bigBallColor;
let ballCount = 50;

let cherry = new Object();
let cherry_cycle=0;
let image_cherry;

//Advance
let medicineCount;
let medicineIMG;
let clockCount;
let clockIMG;


// Values of the numbers in the maze:
// empty = 0
// wall = 1
// ball = 2
// medicine = 3
// clock = 4
// mons = 5
// pacman = 6



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
	canvas.width = "410";
	canvas.height = "400";

	context.font = "bold 60px Verdana";
	context.fillStyle="rgb(221, 221, 42)";
	
	var grd = context.createRadialGradient(75, 50, 5, 90, 60, 100);
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
	// if(currentScreen == 'GamePageDiv'){
	// 	start();
	// }
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
			document.getElementById('errLastName').innerHTML="Last name cannot contains numbers";
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

// Settings Page:

function uniKeyCode1(event) {
	var key = event.key;
  $("#keyup").val(key);
}
function uniKeyCode2(event) {
	var key = event.key;
  $("#keydown").val(key);
}
function uniKeyCode3(event) {
	var key = event.key;
  $("#keyLeft").val(key);
}
function uniKeyCode4(event) {
	var key = event.key;
  $("#keyRight").val(key);
}

function checkValidSettingForm(){
	// showScreen('GamePageDiv');
	// return true;
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

	if(keyUpT==''){
		document.getElementById('keyUpErr').innerHTML="*";
		validLog = false;
	}
	else{
		document.getElementById('keyUpErr').innerHTML="";
	}
	if(keyDownT==''){
		document.getElementById('keyDownErr').innerHTML="*";
		validLog = false;
	}
	else{
		document.getElementById('keyDownErr').innerHTML="";
	}
	if(keyLeftT==''){
		document.getElementById('keyLeftErr').innerHTML="*";
		validLog = false;
	}
	else{
		document.getElementById('keyLeftErr').innerHTML="";
	}
	if(keyRightT==''){
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
		showScreen('GamePageDiv');
		return true;
	}
	
}



















// Generate new Game:

function genBoard(){
	for(let i=0;i<board.length;i++){
		board[i] = new Array(17)
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
	board[3][15]=1;
	board[4][7]=1;
	board[4][8]=1;
	board[4][9]=1;
	board[4][11]=1;
	board[4][15]=1;
	board[5][7]=1;
	board[5][8]=1;
	board[5][9]=1;
	board[5][11]=1;
	board[6][3]=1;
	board[6][4]=1;
	board[6][5]=1;
	board[6][6]=1;
	board[6][11]=1;
	board[6][14]=1;
	board[7][3]=1;
	board[7][6]=1;
	board[7][14]=1;
	board[7][15]=1;
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
	board[11][13]=1;
	board[11][15]=1;
	board[12][3]=1;
	board[12][4]=1;
	board[12][10]=1;
	board[12][11]=1;
	board[12][12]=1;
	board[12][13]=1;
}

function isEmpty(cellRow, cellCol){
	if(board[cellRow][cellCol] == 0){
		return true;
	}
	return false;
}

function randomFreeCell(){
	let cellRow = Math.floor(Math.random()*15+1);
	let cellCol = Math.floor(Math.random()*12+1);
	while(!isEmpty(cellRow,cellCol)){
	cellRow = Math.floor(Math.random()*15+1);
	cellCol = Math.floor(Math.random()*12+1);
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
	for (let i = 0; i< mediumBallCount; i++){
		let cell = randomFreeCell();
		board[cell[0]][cell[1]] = 2;
	}
	for (let i = 0; i< bigBallCount; i++){
		let cell = randomFreeCell();
		board[cell[0]][cell[1]] = 2;
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
	mons[0] = [1,1];
	if(monsCount > 1){
		mons[0] = [1,15];
	}
	if(monsCount > 2){
		mons[0] = [12,1];
	}
	if(monsCount > 3){
		mons[0] = [12,15];
	}
}

function setPacman(){
	let cell = randomFreeCell();
	board[cell[0]][cell[1]] = 6;
}


function start() {
	score = 0;
	pac_color = "yellow";
	start_time = new Date();
	genBoard();
	setWalls();
	setBalls();
	setMedicine();
	setClock();
	createMons();
	setMons();
	setPacman();

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


