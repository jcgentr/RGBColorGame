var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	//mode buttons eventListeners
	setupModeButtons();
	//color eventListeners
	setupColors();
	// initialize the colors
	reset();
	//add eventListener to reset button
	resetButton.addEventListener("click",function(){
		reset();
	});
}

function setupModeButtons(){
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click",function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			//ternary operator used to shorten if-else stmt
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

function setupColors(){
	for (var i = 0; i < squares.length; i++) {
		// add click listeners to all squares
		squares[i].addEventListener("click",function(){
			// get color of clicked square
			var clickedColor= this.style.backgroundColor;
			// compare color to pickedColor
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function reset(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick new random color from array
	pickedColor = pickColor();
	//change colorDisplay to picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
		
	}
	//change header back to original background color
	//change Play Again? to New Colors
	if (resetButton.textContent === "Play Again?") {
		resetButton.textContent = "New Colors";
		h1.style.backgroundColor = "steelblue";
	}
	messageDisplay.textContent = "";
}

function changeColors(color){
	// loop through all squares 
	for (var i = 0; i < squares.length; i++) {
		// change all squares to correct color
		squares[i].style.backgroundColor = color;
	}

}

function pickColor() {
	// pick a random number (0 to length of color array - 1) 
	// to choose pickedColor
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = []
	//add num random colors to array
	for (var i = 0; i < num; i++) {
		//get random color and push into arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0-255
	var r = Math.floor(Math.random()*256);
	//pick a "green" from 0-255
	var g = Math.floor(Math.random()*256);
	//pick a "blue" from 0-255
	var b = Math.floor(Math.random()*256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}