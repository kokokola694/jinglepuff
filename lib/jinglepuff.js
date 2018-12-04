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

  const modal = document.getElementById('myModal');
  const openModal = document.getElementById("open-modal");
  const exitButton = document.getElementById("modal-close");

  openModal.onclick = () => {
      modal.style.display = "block";
  }

  exitButton.onclick = () => {
      modal.style.display = "none";
      canvas.focus();
  }

  window.onclick = (e) => {
      if (e.target == modal) {
          modal.style.display = "none";
          canvas.focus();
      }
  }




canvas.addEventListener('mousedown', () => {
    const titleScreen = document.getElementById('title-screen');
    titleScreen.classList.add('hidden');
    if (!game.started) game.start();
  })

});
