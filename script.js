"use strict";

//always select the elemnts and write at the top of it
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1"); //if there is any id element then you can mention in and use as get elementy by it.
const curr1 = document.getElementById("current--0");
const curr2 = document.getElementById("current--1");
const dice1 = document.querySelector(".dice");
const btn_New = document.getElementById("btn_new");
const btnRoll = document.getElementById("btn_roll");
const btn_Hold = document.getElementById("btn_hold");

//initilizing the code
let scores, currentnumber, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentnumber = 0;
  activePlayer = 0;
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  curr1.textContent = 0;
  curr2.textContent = 0;
  dice1.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentnumber = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling functionalities to be added here.

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1.Generate a normal dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2.Display the dice
    dice1.classList.remove("hidden");
    dice1.src = `dice-${dice}.png`;

    //3.Check for the rolled 1:if true then switch to the next player

    if (dice !== 1) {
      currentnumber += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentnumber;
    } else {
      switchPlayer();
    }
  }
});

btn_Hold.addEventListener("click", function () {
  //1.add the current score to the activeplayer score
  if (playing) {
    scores[activePlayer] += currentnumber;
    console.log(scores[activePlayer]);
    //scores [1] = scores[1]+currentnumber;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check  if the player's  score  must be >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      dice1.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer} `)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer} `)
        .classList.remove("player--active");
    }
    //Finish the game
    else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btn_New.addEventListener("click", init);
