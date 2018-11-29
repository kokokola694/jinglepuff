const Game = require('./game2.js');

document.addEventListener('DOMContentLoaded', ()=> {
  const canvas = document.getElementById('canvas');
  const canvasContext = canvas.getContext('2d');

  const game = new Game(
    canvas,
    canvasContext,
  );

});
