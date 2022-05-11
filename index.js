// General Declarations
import { dictionary } from './dictionary.js'; // pulls our dictionary from the dictionary.js file
const mainMenu = document.getElementById('main-menu'); // gets the Div with the ID main-menu
const hideMenuBtn = document.getElementById('hideMenu');
let gameState = {
  playerScore: 0, // tracks the player's score.
  hiScore: 0,
  seenWords: [],
  newWords: dictionary, // we grab dictionary from somewhere else to make the main code easier to read, and allow easier change in the future.
  currentWord: undefined, // will be defined upon createGame
  lastWord: undefined,
  isGameLoaded: false, // prevents some actions being taken if the game is not loaded.
};
hideMenuBtn.addEventListener('click', hideMenu);


// function to hide all elements in the main menu, is called via an onclick method with one of the buttons inside of it
// since this is only going to be called one time with the start button, we can call the next function automatically.
function hideMenu() {
  let bgAudio = new Audio('./assets/bgMusic.mp3')
  bgAudio.volume = 0.05;
  bgAudio.play();
  let clickAudio = new Audio('./assets/clickEffect.mp3')
  clickAudio.volume = 0.2;
  clickAudio.play();
  mainMenu.setAttribute('hidden', 'true');
  showIntro();
}
// function to display the transition sequence the player sees before the game begins, explaining the object of the game. will automatically lead to the game portion.
function showIntro() {
  let newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'intro');
  newDiv.classList.add('center')
  document.body.appendChild(newDiv);

  let newH3 = document.createElement('h3');
  newH3.classList.add('fadein');
  newH3.innerHTML =
    'You will be shown a word chosen at random, you must choose if you have seen the word during this experiment or if it is a new word in the experiment. Choosing incorrectly ends the experiment.';
  newDiv.append(newH3);

  let nxtBtn = document.createElement('button');
  nxtBtn.classList.add('btn', 'btn-light', 'fadein')
  nxtBtn.textContent = 'Next'
  nxtBtn.addEventListener('click', advanceGame)
  newDiv.append(nxtBtn);

  function advanceGame() {
    let clickAudio = new Audio('./assets/clickEffect.mp3')
    clickAudio.volume = 0.2;
    clickAudio.play();
    newDiv.setAttribute('hidden', 'true');
    createGame();
  }
  ; // hides the intro div after 7 seconds (equal to the animation duration of fadeout in the CSS file + duration before fadeout), then calls the game to be created
}
// creates all of the inital buttons, and calls upon newWord to get the first word for the player.
function createGame() {
  gameState.isGameLoaded = false;
  let newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'gameScreen');
  newDiv.classList.add('center')
  document.body.appendChild(newDiv);
  newWord(gameState.newWords); // call this to randomly pick a word from the newWords array before updating the textContent
  let newH3 = document.createElement('h3');
  newH3.classList.add('randWord');
  newH3.setAttribute('id', 'randWord');
  newH3.textContent = gameState.currentWord;
  newDiv.append(newH3);

  let buttonDiv = document.createElement('div');
  buttonDiv.setAttribute('id', 'buttonHolder');
  newDiv.append(buttonDiv);

  let seenButton = document.createElement('button');
  seenButton.classList.add('btn', 'btn-dark');
  seenButton.textContent = 'Seen';
  seenButton.addEventListener('click', function () {
    checkWord(gameState.seenWords); // to pass parameters in eventlistener functions, you must use an "anonymous function" source https://www.w3schools.com/jsref/met_element_addeventlistener.asp
  });
  buttonDiv.append(seenButton);

  let newButton = document.createElement('button');
  newButton.className += 'btn btn-warning';
  newButton.textContent = 'New';
  newButton.addEventListener('click', function () {
    checkWord(gameState.newWords);
  });
  buttonDiv.append(newButton);

  let scoreH3 = document.createElement('h3');
  scoreH3.classList.add('score');
  scoreH3.setAttribute('id', 'score');
  scoreH3.textContent = `Score: ${gameState.playerScore}`;
  newDiv.append(scoreH3);
  gameState.isGameLoaded = true;
}

function newWord(array) {
  gameState.currentWord = array[Math.floor(Math.random() * array.length)]; // picks a random number between 0 and 1, multiplies it by the array's length, and rounds it down.
  if (gameState.isGameLoaded == true) {
    if (gameState.lastWord != gameState.currentWord) { 
    updateGame();
    gameState.lastWord = gameState.currentWord
    } else {
      pickArray()
    }
  } else {
    gameState.lastWord = gameState.currentWord
  }
}
function checkWord(array) {
  let isCorrect = array.includes(gameState.currentWord);
  if (isCorrect == true) {
    let correctAudio = new Audio('./assets/CinemaSinsDing.mp3')
    correctAudio.volume = 0.2;
    correctAudio.play();
    gameState.playerScore += 1;
    gameState.seenWords.push(gameState.currentWord);
    let index = array.indexOf(gameState.currentWord); // finds wherever the index of the currentword is
    array.splice(index, 1); // removes 1 element starting wherever the index of currentword is.
    pickArray()
  } else {
    let incorrectAudio = new Audio('./assets/wrongBuzz.mp3')
    incorrectAudio.volume = 0.2;
    incorrectAudio.play();
    gameOver();
  }
}

function pickArray(){
  let typeWord = Math.random();
  if (typeWord > 0.5) {
    newWord(gameState.newWords);
  } else {
    newWord(gameState.seenWords);
  }
}

function updateGame() {
  let word = document.getElementById('randWord');
  word.innerHTML = gameState.currentWord;
  let score = document.getElementById('score');
  score.textContent = `Score: ${gameState.playerScore}`;
  if (gameState.hiScore < gameState.playerScore) {
    gameState.hiScore = gameState.playerScore
  }
}

function gameOver() {
  let gameDiv = document.getElementById('gameScreen');
  while (gameDiv.firstChild) {
    gameDiv.removeChild(gameDiv.firstChild);
  }
  gameDiv.remove();

  let gameOverDiv = document.createElement('div');
  gameOverDiv.setAttribute('id', 'gameOver');
  gameOverDiv.classList.add('center')
  document.body.appendChild(gameOverDiv);

  let gameOverBlurb = document.createElement('h3');
  gameOverBlurb.setAttribute('id', 'overBlurb');
  gameOverBlurb.textContent = `Game Over! You got a score of ${gameState.playerScore}!`;
  gameOverDiv.append(gameOverBlurb);

  let buttonDiv = document.createElement('div');
  buttonDiv.setAttribute('id', 'buttonHolder');
  gameOverDiv.append(buttonDiv);

  let hiScore = document.createElement('h3');
  hiScore.setAttribute('id', 'hiScore');
  hiScore.textContent = `High Score: ${gameState.hiScore}`
  gameOverDiv.append(hiScore)

  let newGameButton = document.createElement('button');
  newGameButton.classList.add('btn','btn-dark');
  newGameButton.textContent = 'Try Again';
  newGameButton.addEventListener('click', function () {
    while (gameOverDiv.firstChild) {
      gameOverDiv.removeChild(gameOverDiv.firstChild);
    }
    gameOverDiv.remove();
    gameState.playerScore = 0;
    gameState.seenWords = [];
    gameState.newWords = dictionary;
    createGame();
  });
  buttonDiv.append(newGameButton);
}
