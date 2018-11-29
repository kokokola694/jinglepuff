const Player = require('./player');

class Game {
  constructor (canvas, canvasContext) {
    this.canvas = canvas;
    this.context = canvasContext;
    this.width = 900;
    this.height = 400;
    canvas.width = this.width;
    canvas.height = this.height;

    this.player = new Player({xPos: this.width/10, yPos: this.height - 15});
    canvasContext.clearRect(0,0,this.width,this.height);
    canvasContext.fillStyle = "pink";
    canvasContext.fillRect(this.player.xPos,
      this.player.yPos, this.player.width, this.player.height);
    this.gravity = 0.25;
    this.keys = [];

    this.canvas.addEventListener("keydown", (e) => this.keys[e.keyCode] = true);
    this.canvas.addEventListener("keyup", (e) => this.keys[e.keyCode] = false);

    this.playerJump = this.playerJump.bind(this);
    this.render = this.render.bind(this);

  }

  playerJump (e) {
    if (e.keyCode === 32) {
      e.preventDefault();
      this.player.jumping = true;
    }
  }

  render () {
    this.player.update(this.context);
    requestAnimationFrame(this.render);
  }
}

module.exports = Game;
