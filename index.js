// General Declarations
const mainMenu = document.getElementById('main-menu'); // gets the Div with the ID main-menu
const playBtn = document.getElementById('play'); // gets the Start Game button
let playerScore // tracks the player's score.

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

function createGame() {
  let newDiv = document.createElement('div');
  newDiv.setAttribute('id', 'gameScreen');
  document.body.appendChild(newDiv);

  let newH3 = document.createElement('h3');
  newH3.className += 'randWord';
  newH3.textContent = 'sample word';
  newDiv.append(newH3);

  let buttonDiv = document.createElement('div');
  buttonDiv.setAttribute('id', 'buttonHolder');
  newDiv.append(buttonDiv);

  let seenButton = document.createElement('button');
  seenButton.className += 'btn btn-dark';
  seenButton.textContent = 'Seen';
  buttonDiv.append(seenButton);

  let newButton = document.createElement('button');
  newButton.className += 'btn btn-warning';
  newButton.textContent = 'New';
  buttonDiv.append(newButton);

  let scoreH3 = document.createElement('h3');
  scoreH3.className += 'score';
  scoreH3.textContent = `Score: ${playerScore}`;
  newDiv.append(scoreH3);
}
