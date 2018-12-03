const Game = require('./game.js');

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

  canvasContext.fillStyle = 'pink';
  canvasContext.fillRect(0,0,900,400);
  canvasContext.font = "700 50px Arial";
  canvasContext.fillStyle = "teal";
  canvasContext.fillText("Click anywhere to play!", 200, 170);
  canvasContext.strokeText("Click anywhere to play!", 200, 170);

canvas.addEventListener('mousedown', () => {
    if (!game.started) game.start();
  })
});
