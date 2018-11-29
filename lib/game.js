const Player = require('./player');

class Game {
  constructor (canvas, canvasContext) {
    this.canvas = canvas;
    this.context = canvasContext;

    this.player = new Player({xPos: 100, yPos: 210});

    this.setButtonListeners();


    this.jump = this.jump.bind(this);
    this.draw = this.draw.bind(this);
    this.canvas.focus();
  }

  setButtonListeners() {
    this.canvas.addEventListener('keydown', (e) => this.jump(e));
  }

  jump (event) {
    if (event.code === 'Space') {
      event.preventDefault();
      this.player.toggleJump();
    }
  }

  draw () {
    this.player.update(this.context);
    this.context.beginPath();
    this.context.moveTo(0,210);
    this.context.lineTo(800,210);
    this.context.stroke();
    requestAnimationFrame(this.draw);
  }
}

module.exports = Game;
