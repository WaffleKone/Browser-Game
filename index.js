// General Declarations
const mainMenu = document.getElementById('main-menu'); // gets the Div with the ID main-menu
const playBtn = document.getElementById('play'); // gets the Start Game button

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
    newDiv.setAttribute('hidden', 'true')
    createGame();
  }, 2000); // hides the intro div after 2 seconds (equal to the animation duration of fadeout in the CSS file.), then calls the game to be created
}

function createGame() {
  // 
}
