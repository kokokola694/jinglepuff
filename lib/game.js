const Player = require('./player');
const Enemy = require('./enemy');
const Background = require('./background');

class Game {
  constructor (backgroundContext, canvas, canvasContext) {
    this.canvas = canvas;
    this.context = canvasContext;
    this.backgroundContext = backgroundContext;

    this.player = new Player({xPos: 120, yPos: 290});

    this.setButtonListeners();
    this.setBackground(backgroundContext);

    this.canvas.focus();
    this.enemies = [];
    this.gameOver = false;

    this.jump = this.jump.bind(this);
    this.render = this.render.bind(this);
  }

  setButtonListeners() {
    this.canvas.addEventListener('keydown', (e) => this.jump(e));
  }

  setBackground(bgCtx) {
    const bg = new Image();
    bg.src = './assets/images/winter.png';
    this.background = new Background(bgCtx, bg);
  }

  jump (e) {
    if (e.code === 'Space') {
      e.preventDefault();
      this.player.setJumpVel();
    }
  }

  render () {
    if (!this.gameOver) {
      requestAnimationFrame(this.render);
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
      this.background.render();
    }
  }

  start() {
    this.createEnemy();
    this.render();
  }

  createEnemy() {
    this.enemies.push(new Enemy());
  }

  stop () {
    this.gameOver = true;
  }
}

module.exports = Game;
