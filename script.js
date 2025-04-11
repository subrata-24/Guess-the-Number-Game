let rndm = parseInt(Math.random() * 100 + 1);

const userInput = document.querySelector("#guessField");
const submit = document.querySelector("#submt");
const guese = document.querySelector(".gueses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector('.resultParas');

let p = document.createElement("p");

let prevGuess = [];
let guessCount = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("⚠️ Please enter a valid number!");
  } else if (guess < 1) {
    alert("⚠️ Please enter a number greater than 0.");
  } else if (guess > 100) {
    alert("⚠️ Please enter a number less than or equal to 100.");
  } else {
    prevGuess.push(guess);
    displayGuess(guess);
    if (guess === rndm) {
      displayMessage(`🎉 Congratulations! You got it right! The number was ${rndm}`);
      endGame();
    } else if (guessCount === 11) {
      displayMessage(`💀 Game Over! The number was ${rndm}`);
      endGame();
    } else {
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess < rndm) {
    displayMessage("📉 Too low!");
  } else {
    displayMessage("📈 Too high!");
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guese.textContent += `${guess}, `;
  guessCount++;
  remaining.textContent = `${11 - guessCount}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute("disabled", '');
  p.setAttribute('id', 'newgame');
  p.textContent = '🔁 Start a new game';
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector("#newgame");
  newGameButton.addEventListener('click', () => {
    rndm = parseInt(Math.random() * 100 + 1);
    guessCount = 1;
    prevGuess = [];
    guese.textContent = '';
    remaining.textContent = '10';
    lowOrHi.innerHTML = '';
    userInput.removeAttribute("disabled");
    userInput.value = '';
    startOver.removeChild(p);
    playGame = true;
  });
}
