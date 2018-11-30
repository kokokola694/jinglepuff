const Player = require('./player');
const Enemy = require('./enemy');
const Koffing = require('./enemy_koffing');
const Meowth = require('./enemy_meowth');
const Background = require('./background');
const Score = require('./score');
const Balloon = require('./balloon');

class Game {
  constructor (backgroundContext, canvas, canvasContext) {
    this.canvas = canvas;
    this.context = canvasContext;
    this.backgroundContext = backgroundContext;

    this.player = new Player({xPos: 120, yPos: 280});

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
    this.balloon = new Balloon();
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
      this.player.render(this.context);
      let deleteIndex = null;
      let lastPos = null;

      this.enemies.forEach((enemy, i) => {
        enemy.render(this.context);
        if (this.player.collided(enemy)) {
          this.stop();
        }
        if (enemy.xPos < -100) {
          deleteIndex = i;
        }
        if (i === this.enemies.length - 1 && Math.random() < 0.40) {
          lastPos = enemy.xPos;
        }
      })

      if (deleteIndex !== null) {
        this.enemies.splice(deleteIndex, 1);
      }
      if (lastPos && lastPos < 400) {
        this.createEnemy();
      }

      this.background.render();
      this.score.render(this.context);
      this.balloon.render(this.context);
    }
  }

  start() {
    this.score = new Score();
    this.createEnemy();
    this.render();
  }

  createEnemy() {
    if (this.score.currentLevel === 1) {
      this.enemies.push(new Koffing());
    }
    if (this.score.currentLevel === 2) {
      const generator = Math.random();
      if (generator < 0.65) {
        this.enemies.push(new Meowth());
      } else if (generator < 1) {
        this.enemies.push(new Koffing());
      }
    }

  }

  stop () {
    this.gameOver = true;
  }
}

module.exports = Game;
