const Player = require('./player');
const Enemy = require('./enemy');

class Game {
  constructor (canvas, canvasContext) {
    this.canvas = canvas;
    this.context = canvasContext;

    this.player = new Player({xPos: 100, yPos: 210});

    this.setButtonListeners();

    this.jump = this.jump.bind(this);
    this.draw = this.draw.bind(this);
    this.canvas.focus();
    this.enemies = [];
    this.gameOver = false;
  }

  setButtonListeners() {
    this.canvas.addEventListener('keydown', (e) => this.jump(e));
  }

  jump (e) {
    if (e.code === 'Space') {
      e.preventDefault();
      this.player.toggleJump();
    }
  }

  draw () {
    if (!this.gameOver) {
      requestAnimationFrame(this.draw);
      this.player.update(this.context);
      let deleteIndex = null;
      this.enemies.forEach((enemy, i) => {
        enemy.update(this.context);
        if (this.player.collided(enemy)) {
          this.stop();
        }
        if (enemy.hitbox().maxX < 0) {
          deleteIndex = i;
        }
      })
      if (deleteIndex !== null) {
        this.enemies.splice(deleteIndex, 1);
        this.createEnemy();
      }
    }
  }

  start() {
    this.createEnemy();
    this.draw();
  }

  createEnemy() {
    this.enemies.push(new Enemy());
  }

  stop () {
    this.gameOver = true;
  }
}

module.exports = Game;
