const spinner = document.querySelector(".spinner p");
const spinnerContainer = document.querySelector(".spinner");
let rotateCount = 0;
let startTime = null;
let rAF;
const btn = document.querySelector("button");
const result = document.querySelector(".result");

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
} //This function takes two numbers and returns a random number between the two.

function draw(timestamp) {
  if(!startTime) {
   startTime = timestamp;
  }

  rotateCount = (timestamp - startTime) / 3;

  rotateCount %= 360;

  spinner.style.transform = 'rotate(' + rotateCount + 'deg)';
  rAF = requestAnimationFrame(draw);
}

//Setting the initial state of the website, hidding the result banner and the spinner arrow.

result.style.display = 'none';
spinnerContainer.style.display = 'none';

function reset() {
  btn.style.display = 'block';
  result.textContent = '';
  result.style.display = 'none';
} //Reset function to start the game again

btn.addEventListener('click', start);

function start() {
  draw();
  spinnerContainer.style.display = 'block';
  btn.style.display = 'none';
  setTimeout(setEndgame, random(5000,10000));
}//Hides the start button and sets a timeout between 5-10 seconds for the setEndGame function

function setEndgame() {
  cancelAnimationFrame(rAF);
  spinnerContainer.style.display = 'none';
  result.style.display = 'block';
  result.textContent = 'PLAYERS GO!!';
//Hides the spinner arrow and shows the result prompt
  document.addEventListener('keydown', keyHandler);

  function keyHandler(e) { //Keyboard event handler
    let isOver = false;
    console.log(e.key);

    if (e.key === "a") {
      result.textContent = 'Player 1 won!!';
      isOver = true;
    } else if (e.key === "l") {
      result.textContent = 'Player 2 won!!';
      isOver = true;
    }

    if (isOver) {
      document.removeEventListener('keydown', keyHandler);
      setTimeout(reset, 5000);
    }
  };
}