const Game = require('./game.js');
const Modal = require('./modal.js');


document.addEventListener('DOMContentLoaded', ()=> {
  const canvas = document.getElementById('canvas');
  const canvasContext = canvas.getContext('2d');
  const background = document.getElementById('background');
  const backgroundContext = background.getContext('2d');
  const ground = document.getElementById('ground');
  const groundContext = ground.getContext('2d');

  const game = new Game(
    backgroundContext,
    groundContext,
    canvas,
    canvasContext,
  );

  Modal(canvas);

  canvas.addEventListener('mousedown', () => {
    const titleScreen = document.getElementById('title-screen');
    titleScreen.classList.add('hidden');
    if (!game.started) game.start();
  });

});
