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
  const btn = document.getElementById("open-modal");
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
      modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }





canvas.addEventListener('mousedown', () => {
    const titleScreen = document.getElementById('title-screen');
    titleScreen.classList.add('hidden');
    if (!game.started) game.start();
  })

});
