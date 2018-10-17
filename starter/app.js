
let activePlayer, previousScore, winScore;

let wininput = document.querySelector('.wininput');
wininput.addEventListener('keyup', () => {
  if (event.keyCode === 13) {
    document.querySelector('.winscore').textContent = wininput.value;
    winScore = parseInt( wininput.value );
    doGame();
  }
});


newGame();

document.querySelector('.btn-new').addEventListener('click', newGame);

document.querySelector('.btn-roll').addEventListener('click', () => {
  let dice1 = Math.floor( Math.random() * 6 ) + 1;
  let dice2 = Math.floor( Math.random() * 6 ) + 1;

  let diceDOM_1 = rollDice(1, dice1);
  let diceDOM_2 = rollDice(2, dice2);

  if (previousScore === 6 && (dice1 + dice2) === 6) {
    document.getElementById('score-' + activePlayer).textContent = 0;
    console.log('FATAL LOSING!!!');
    togglePlayer();
  } else if (dice1 !== 1 && dice2 !== 1) {
    let currentDOM = document.getElementById('current-' + activePlayer);
    let current = parseInt( currentDOM.textContent );
    current += (dice1 + dice2);
    currentDOM.textContent = current;
  } else {
    togglePlayer();
    diceDOM_1.style.display = 'none';
    diceDOM_2.style.display = 'none';
  }

  previousScore = dice1 + dice2;
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  let scoreDOM = document.getElementById('score-' + activePlayer);

  let score = parseInt( scoreDOM.textContent );
  let current = parseInt( document.getElementById('current-' + activePlayer).textContent );
  score += current;
  scoreDOM.textContent = score;

  if (score >= winScore) {
    let winner = document.querySelector('#name-' + activePlayer);
    winner.classList.add('winner');
    winner.textContent = 'WINNER!';
    document.querySelector('.btn-hold').disabled = true;
    document.querySelector('.btn-roll').disabled = true;
    return;
  }

  togglePlayer();
});

function togglePlayer() {
  currentsToZero();

  activePlayer = Math.abs(activePlayer - 1);

  document.querySelector(`.player-0-panel`).classList.toggle('active');
  document.querySelector(`.player-1-panel`).classList.toggle('active');

  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';
};

function currentsToZero() {
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
};

function newGame() {
  currentsToZero();

  let players = document.getElementsByClassName('player-name');

  Array.prototype.forEach.call(players, (item, i) => {
    item.classList.remove('winner');
    item.textContent = 'PLAYER ' + (i + 1);
  });

  document.querySelector(`.player-0-panel`).classList.remove('active');
  document.querySelector(`.player-1-panel`).classList.remove('active');

  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;

  document.querySelector('.btn-hold').disabled = false;
  document.querySelector('.btn-roll').disabled = false;
  
  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';


  activePlayer = Math.floor( Math.random() + 0.5 );
  console.log(activePlayer);
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
};

function rollDice(number, value) {
  let diceDOM = document.querySelector('.dice-' + number);
  diceDOM.style.display = 'block';
  diceDOM.src = `dice-${value}.png`;
  return diceDOM;
}

function doGame() {  
  setInterval(() => {
    console.log('loop');
    let myEvent = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    });
    document.querySelector('.btn-roll').dispatchEvent(myEvent);
    if ( Math.random() >= 0.5 ) document.querySelector('.btn-hold').dispatchEvent(myEvent);
  }, 300);
};
