const Game = require('./game.js');

document.addEventListener('DOMContentLoaded', ()=> {
  const canvas = document.getElementById('canvas');
  const canvasContext = canvas.getContext('2d');
  const background = document.getElementById('background');
  const backgroundContext = background.getContext('2d');
  const ground = document.getElementById('ground');
  const groundContext = ground.getContext('2d');

  const muteButton = document.getElementById('mute-btn');
  const pauseButton = document.getElementById('pause-btn');

  const openModal = document.getElementById("open-modal");
  const modal = document.getElementById('instructions');
  const exitButton = document.getElementById("modal-close");

  const game = new Game(
    backgroundContext,
    groundContext,
    canvas,
    canvasContext,
  );

  openModal.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (!game.paused) game.pause("button");
    modal.style.display = "block";
  });

  exitButton.addEventListener('mousedown', (e) => {
    e.preventDefault();
    modal.style.display = "none";
    if (game.paused) game.pause("button");
    canvas.focus();
  });

  window.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
      if (game.paused) game.pause("button");
      canvas.focus();
    }
  };

  muteButton.addEventListener('mousedown', (e) => {
    e.preventDefault();
    game.mute("button");
    canvas.focus();
  })

  pauseButton.addEventListener('mousedown', (e) => {
    e.preventDefault();
    game.pause("button");
    canvas.focus();
  })

  canvas.addEventListener('mousedown', () => {
    const titleScreen = document.getElementById('title-screen');
    titleScreen.classList.add('hidden');
    if (!game.started) game.start();
  });

});
