var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var difficultyMode;
var pickedColor;
var colors;

init();

function init() {
  setUpModeButtons();
  resetButton.addEventListener("click", reset);
  difficultyMode = 6;
  colors = generateRandomColors(difficultyMode);
  pickedColor = pickColor(colors);
  colorDisplay.textContent = pickedColor;
  setUpSquares();
}

function reset() {
  colors = generateRandomColors(difficultyMode);
  pickedColor = pickColor(colors);
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New Colors";
  messageDisplay.textContent = "";
  h1.style.backgroundColor = "steelblue";

  for (let i = 0; i < squares.length; i++) {
    const square = squares[i];
    if (!colors[i] && square.style.display === "none") {
      break;
    } else if (!colors[i]) {
      square.style.display = "none";
      continue;
    }

    square.style.display = "block";
    square.style.backgroundColor = colors[i];
  }
}

function setUpModeButtons() {
  for (let i = 0; i < modeButtons.length; i++) {
    const btn = modeButtons[i];
    btn.addEventListener("click", modeButtonListener);
  }
}

function modeButtonListener() {
  if (this.textContent === "Easy") {
    if (difficultyMode === 3) return;
    difficultyMode = 3;
  } else {
    if (difficultyMode === 6) return;
    difficultyMode = 6;
  }
  for (let index = 0; index < modeButtons.length; index++) {
    const auxbtn = modeButtons[index];
    auxbtn.classList.remove("selected");
  }
  this.classList.add("selected");
  reset();
}

function setUpSquares() {
  for (let i = 0; i < squares.length; i++) {
    const square = squares[i];
    if (!colors[i]) {
      square.style.display = "none";
    } else {
      square.style.backgroundColor = colors[i];
    }
    square.addEventListener("click", squareListener);
  }
}

function squareListener() {
  var clickedColor = this.style.backgroundColor;
  if (clickedColor === pickedColor) {
    messageDisplay.textContent = "Correct!";
    changeColors(clickedColor);
    h1.style.backgroundColor = clickedColor;
    resetButton.textContent = "Play Again?";
  } else {
    this.style.backgroundColor = "#232323";
    messageDisplay.textContent = "Try Again";
  }
}

function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
    const square = squares[i];
    square.style.backgroundColor = color;
  }
}

function pickColor(colors) {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  var arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  return "rgb(" + red + ", " + green + ", " + blue + ")";
}
