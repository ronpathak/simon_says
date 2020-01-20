// clear all variables
var level = 0; // the level the user is playing
var simon = []; // the array that collects what simon says in
var player = []; // the array that we collect the user input
var gameOn = false; // flag to indicate if the game is in progress or waiting to start
var playerTurn = false; // flag to restrict simon from speaking at the same time user is inputing


// press button to start game and pressed buttons at other times won't work
$(document).keydown(function() {
  if (!gameOn) {
    simon = [];
    gameOn = true;
    // playerTurn = false;
    console.log("gameOn =" + gameOn);
    // update the heading to indicate which level
    var level = 1
    $("#level-title").html("Level " + level);
    // simon starts to talk
    simonsSays(simon, level);
  }
});


function simonsSays(simonArray, currentLevel) {
  // this section  generates the simons says sequence
  // if (!playerGo) {
    var numbClicks = 0
    getRandomColour();
    simonArray.push(randomColour);
    // simonArray = ["blue","green","yellow","green"];
    console.log("numbClicks = "+numbClicks);
    console.log("current level =" + currentLevel);
    console.log("simon =" + simonArray);
    for (let i = 0; i < simonArray.length; i++) {
      setTimeout(function() {
        showPressedButton(simonArray[i]);
        playPressedButton(simonArray[i]);
      }, 500 * i);
    }
  // }
  // this section clears the user inputs
  var player = [];
  // playerTurn = true;
  if(numbClicks>simonArray.length){
    numbClicks = 0;
  }
  if (numbClicks < simonArray.length + 1) {
    // this section listens for user inputs
    $(".btn").click(function() {
      numbClicks++;
      player.push(this.id);
      if (player[player.length - 1] == simonArray[player.length - 1]) {
        showPressedButton(this.id);
        playPressedButton(this.id);
        if (numbClicks == simonArray.length) {
          playerGo = false;
          player = [];
          setTimeout(function () {
            moveToNextLevel(simonArray, currentLevel);
          }, 700);
          numbClicks=0;
        }
      } else if (player[player.length - 1] != simonArray[player.length - 1]){ // if the input is wrong, give wrong answer feedback and reset to play again
        console.log("simon = " + simonArray + "simon length = " + simonArray.length);
        console.log("player = " + player + "player length = " + player.length);
        console.log("numbClicks =" + numbClicks);
        numbClicks = 100;
        endGame();
      }
    });
  }
}

// this function moves on to next level by updating the heading and asking simon to talk again
function moveToNextLevel(simonArray1, currentLevel1) {
  currentLevel1++;
  $("#level-title").html("Level " + currentLevel1);
  simonsSays(simonArray1, currentLevel1);
}

// animate the buttons being pressed
function showPressedButton(buttonIDColour) {
  $("." + buttonIDColour).addClass("pressed");
  setTimeout(function() {
    $("." + buttonIDColour).removeClass("pressed");
  }, 100);
}

// animate the screen when you make a mistake and the game ends
function endGame(){
  $("*").addClass("game-over");
  setTimeout(function() {
  $("*").removeClass("game-over");
  }, 100);
  showPressedButton("wrong");
  playPressedButton("wrong");
  // gameOn = false;
  $("#level-title").html("Game over!");
  setTimeout(function() {
    location.reload(true);
  }, 10000);
}

// play the selected note for the button being pressed
function playPressedButton(buttonIDMusic) {
  buttonIDMusic = new Audio("sounds/" + buttonIDMusic + ".mp3");
  buttonIDMusic.playbackRate = 0.75;
  buttonIDMusic.play();
}

// this function generates a random colour
function getRandomColour() {
  var colourButtons = ["green", "red", "yellow", "blue"];
  var randomColourNumber = Math.floor(Math.random() * 4);
  randomColour = colourButtons[randomColourNumber];
  return randomColour;
}
