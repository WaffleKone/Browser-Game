// General Declarations
const mainMenu = document.getElementById('main-menu'); // gets the Div with the ID main-menu
const playBtn = document.getElementById('play'); // gets the Start Game button
let playerScore = 0; // tracks the player's score.
let seenWords = [];
let newWords = ['car', 'write', 'words', 'testing'];
let currentWord; // will be defined upon createGame

// function to hide all elements in the main menu, is called via an onclick method with one of the buttons inside of it
// since this is only going to be called one time with the start button, we can call the next function automatically.
function hideMenu() {
  mainMenu.setAttribute('hidden', 'true');
  showIntro();
}
// function to display the transition sequence the player sees before the game begins, explaining the object of the game. will automatically lead to the game portion.
function showIntro() {
  let newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'intro');
  document.body.appendChild(newDiv);

  let newH3 = document.createElement('h3');
  newH3.className += 'fadein';
  newH3.innerHTML =
    'You will be shown a word chosen at random, you must choose if you have seen the word during this experiment or if it is a new word in the experiment. Choosing incorrectly ends the experiment.';
  newDiv.append(newH3);

  setTimeout(() => {
    newH3.className = 'fadeout';
  }, 5000); // have the rules fade out after 5 seconds (ms)

  setTimeout(() => {
    newDiv.setAttribute('hidden', 'true');
    createGame();
  }, 7000); // hides the intro div after 7 seconds (equal to the animation duration of fadeout in the CSS file + duration before fadeout), then calls the game to be created
}
// creates all of the inital buttons, and calls upon newWord to get the first word for the player.
function createGame() {
  let newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'gameScreen');
  document.body.appendChild(newDiv);
  firstWord(); // call this to randomly pick a word from the newWords array before updating the textContent
  let newH3 = document.createElement('h3');
  newH3.className += 'randWord';
  newH3.setAttribute('id', 'randWord');
  newH3.textContent = currentWord;
  newDiv.append(newH3);

  let buttonDiv = document.createElement('div');
  buttonDiv.setAttribute('id', 'buttonHolder');
  newDiv.append(buttonDiv);

  let seenButton = document.createElement('button');
  seenButton.className += 'btn btn-dark';
  seenButton.textContent = 'Seen';
  seenButton.addEventListener('click', function () {
    checkWord(seenWords); // to pass parameters in eventlistener functions, you must use an "anonymous function" source https://www.w3schools.com/jsref/met_element_addeventlistener.asp
  });
  buttonDiv.append(seenButton);

  let newButton = document.createElement('button');
  newButton.className += 'btn btn-warning';
  newButton.textContent = 'New';
  newButton.addEventListener('click', function () {
    checkWord(newWords);
  });
  buttonDiv.append(newButton);

  let scoreH3 = document.createElement('h3');
  scoreH3.className += 'score';
  scoreH3.setAttribute('id', 'score');
  scoreH3.textContent = `Score: ${playerScore}`;
  newDiv.append(scoreH3);
}
function firstWord() {
  let randomPick = newWords[Math.floor(Math.random() * newWords.length)]; // picks a random num between 0 and 1, multiplies it by the length of the array chosen, then rounds it down.
  currentWord = randomPick;
}
function newWord(array) {
  let randomPick = array[Math.floor(Math.random() * array.length)];
  currentWord = randomPick;
  updateGame(); // updating the game before the first word is created will result in an error, hence the similar firstWord function.
}

function checkWord(array) {
  let isCorrect = array.includes(currentWord);
  console.log(isCorrect);
  if (isCorrect == true) {
    playerScore += 1;
    seenWords.push(currentWord);
    let index = array.indexOf(currentWord); //finds wherever the index of the currentword is
    array.splice(index, 1); // removes 1 element starting wherever the index of currentword is.
    newWord(newWords);
  } else {
    
  }
}
function updateGame() {
  let word = document.getElementById('randWord');
  word.innerHTML = currentWord;
  let score = document.getElementById('score');
  score.textContent = `Score: ${playerScore}`;
}
