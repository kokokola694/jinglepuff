const Player = require('./player');
const Enemy = require('./enemy');
const Koffing = require('./enemy_koffing');
const Meowth = require('./enemy_meowth');
const Background = require('./background');
const Ground = require('./ground');
const Score = require('./score');
const Balloon = require('./balloon');

class Game {
  constructor (backgroundContext, groundContext, canvas, canvasContext) {
    this.canvas = canvas;
    this.context = canvasContext;

    this.player = new Player({xPos: 120, yPos: 280});

    this.setButtonListeners();
    this.setVisualAssets(backgroundContext, groundContext);

    this.canvas.focus();
    this.enemies = [];
    this.gameOver = false;
    this.transitioning = true;
    this.spawning = false;

    this.jump = this.jump.bind(this);
    this.render = this.render.bind(this);
    this.restart = this.restart.bind(this);
  }

  setButtonListeners() {
    this.canvas.addEventListener('keydown', (e) => this.jump(e));
    this.canvas.addEventListener('keydown', (e) => this.restart(e));
  }

  setVisualAssets(backgroundContext, groundContext) {
    const bg = new Image();
    bg.src = './assets/images/winter1.png';
    const ground = new Image();
    ground.src = './assets/images/snow_houses.png'
    this.background = new Background(backgroundContext, bg);
    this.ground = new Ground(groundContext, ground);
    this.balloon = new Balloon();
  }

  jump (e) {
    if (e.code === 'Space' && !this.gameOver) {
      e.preventDefault();
      this.player.setJumpVel();
    }
  }

  restart(e) {
    if (e.code === 'KeyR') {
      e.preventDefault();

      this.player = new Player({xPos: 120, yPos: 280});
      this.enemies = [];
      this.gameOver = false;
      this.transitioning = true;
      this.spawning = false;
      this.start();
    }
  }

  render () {
    if (!this.gameOver) {
      requestAnimationFrame(this.render);
      this.player.render(this.context);

      this.handleEnemies();

      if (this.enemies.length && this.transitioning) {
        this.spawning = false;
        this.score.render(this.context);
      } else if (this.transitioning) {
        this.spawning = false;
        this.handleTransition();
      } else if (!this.enemies.length) {
        this.spawning = true;
        this.score.render(this.context);
      } else {
        this.score.render(this.context);
      }

      if (this.spawning) {
        this.createEnemy();
      }

      if (this.score.frameCount === 500 || this.score.frameCount === 1000) {
        this.transitioning = true;
      }

      this.balloon.render(this.context);
      this.background.render();
      this.ground.render();

    }
  }

  handleEnemies() {
    let deleteIndex = null;
    this.spawning = false;

    this.enemies.forEach((enemy, i) => {
      enemy.render(this.context);
      if (!this.player.invincible && this.player.collided(enemy)) {
        this.stop();
      }
      if (enemy.xPos < -100) {
        deleteIndex = i;
      }
      if (i === this.enemies.length - 1 && enemy.xPos < 320) {
        this.spawning = true;
      }
    })

    if (deleteIndex !== null) {
      this.enemies.splice(deleteIndex, 1);
    }
  }

  displayText () {
    this.context.font = "700 50px Arial";
    this.context.fillStyle = "pink";
    this.context.fillText(`LEVEL ${this.score.currentLevel}`, 450, 200);
    this.context.strokeText(`LEVEL ${this.score.currentLevel}`, 450, 200);
    this.context.textAlign = "center";
  }

  handleTransition() {
    this.transitioning = true;
    this.displayText();
    setTimeout(() => this.transitioning = false, 3000);
  }

  start() {
    this.score = new Score();
    this.render();
  }

  createEnemy() {
    const randXPos = Math.floor(Math.random() * 50) + 950;
    if (this.score.frameCount < 250) {
      this.enemies.push(new Koffing({speed: 5, xPos: randXPos, yPos: 250}));
    } else if (this.score.frameCount <= 500) {
      const generator = Math.random();
      if (generator < 0.25) {
        this.enemies.push(new Koffing({speed: 5, xPos: randXPos, yPos: 250}));
      } else {
        this.enemies.push(new Meowth({xPos: randXPos}));
      }
    } else if (this.score.frameCount <= 800) {
      const generator = Math.random();
      if (generator < 0.3) {
        this.enemies.push(new Koffing({speed: 6.5, xPos: randXPos, yPos: 250}));
      } else if (generator < 0.6) {
        this.enemies.push(new Meowth({xPos: randXPos}));
      } else {
        this.enemies.push(new Koffing({speed: 6.5, xPos: randXPos, yPos: 250}));
        this.enemies.push(new Koffing({speed: 6.5, xPos: randXPos, yPos: 180}));
      }
    } else {
      const generator = Math.random();
      if (generator < 0.2) {
        this.enemies.push(new Koffing({speed: 7, xPos: randXPos, yPos: 250}));
      } else if (generator < 0.4) {
        this.enemies.push(new Meowth({xPos: randXPos}));
      } else if (generator < 0.7) {
        this.enemies.push(new Koffing({speed: 7, xPos: randXPos, yPos: 250}));
        this.enemies.push(new Koffing({speed: 7, xPos: randXPos, yPos: 180}));
      } else {
        this.enemies.push(new Koffing({speed: 7, xPos: randXPos, yPos: 180}));
        this.enemies.push(new Meowth({xPos: randXPos - 20}));
      }
    }

  }

  stop () {
    this.context.font = "700 60px Arial";
    this.context.fillStyle = "pink";
    this.context.fillText(`GAME OVER`, 625, 200);
    this.context.strokeText(`GAME OVER`, 625, 200);
    this.context.textAlign = "center";
    this.context.font = "700 24px Arial";
    this.context.fillStyle = "pink";
    this.context.fillText(`Press R to try again!`, 450, 250);
    this.context.strokeText(`Press R to try again!`, 450, 250);
    this.context.textAlign = "center";
    this.gameOver = true;
  }
}

module.exports = Game;
