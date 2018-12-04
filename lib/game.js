const Player = require('./player');
const Enemy = require('./enemy');
const Koffing = require('./enemy_koffing');
const Meowth = require('./enemy_meowth');
const Background = require('./background');
const Ground = require('./ground');
const Score = require('./score');
const Balloon = require('./balloon');
const Pokeball = require('./pokeball');

class Game {
  constructor (backgroundContext, groundContext, canvas, canvasContext) {
    this.canvas = canvas;
    this.context = canvasContext;

    this.started = false;

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

    this.playAudio = new Audio('./assets/audio/shiver_star.mp3');
    this.playAudio.loop = true;
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

      if (this.score.frameCount === 700 || this.score.frameCount === 1500) {
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
        if (enemy.constructor.name === "Pokeball") {
          this.score.currentScore += enemy.points;
          deleteIndex = i;
        } else {
          this.stop();
        }
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
    this.context.font = "700 50px Aclonica";
    this.context.fillStyle = "pink";
    this.context.fillText(`LEVEL ${this.score.currentLevel}`, 450, 200);
    this.context.strokeText(`LEVEL ${this.score.currentLevel}`, 450, 200);
    this.context.font = "500 25px Aclonica";
    this.context.fillText(`${this.levelText(this.score.currentLevel)}`, 450, 250);
    this.context.strokeText(`${this.levelText(this.score.currentLevel)}`, 450, 250);
    this.context.textAlign = "center";
  }

  levelText (level) {
    switch (level) {
      case 1:
        return "Tip: Press SPACE to jump!";
      case 2:
        return "Tip: Press SPACE twice to double-jump!";
      case 3:
        return "Tip: Time your jumps carefully...";
    }
  }

  handleTransition() {
    this.transitioning = true;
    this.displayText();
    setTimeout(() => this.transitioning = false, 3000);
  }

  start() {
    this.context.clearRect(0,0,900,400);
    this.score = new Score();
    this.started = true;
    this.playAudio.currentTime = 0;
    this.playAudio.play();

    this.render();
  }

  createEnemy() {
    const randXPos = Math.floor(Math.random() * 50) + 950;
    const generator = Math.random();
    if (this.score.frameCount < 350) {
      if (generator < 0.65) {
        this.enemies.push(new Pokeball({xPos: randXPos, yPos: 300}));
        this.enemies.push(new Koffing({speed: 5, xPos: randXPos + 200, yPos: 250}));
      } else {
        this.enemies.push(new Koffing({speed: 5, xPos: randXPos, yPos: 250}));
      }
    } else if (this.score.frameCount <= 700) {
      if (generator < 0.25) {
        this.enemies.push(new Koffing({speed: 5, xPos: randXPos + 200, yPos: 250}));
        this.enemies.push(new Pokeball({xPos: randXPos, yPos: 300}))
      } else if (generator < 0.75) {
        this.enemies.push(new Meowth({xPos: randXPos}));
      } else {
        this.enemies.push(new Meowth({xPos: randXPos + 100}))
        this.enemies.push(new Pokeball({xPos: randXPos, yPos: 200}))
      }
    } else if (this.score.frameCount <= 1000) {
      if (generator < 0.3) {
        this.enemies.push(new Koffing({speed: 6.5, xPos: randXPos + 200, yPos: 250}));
        this.enemies.push(new Pokeball({xPos: randXPos, yPos: 200}))
      } else if (generator < 0.6) {
        this.enemies.push(new Meowth({xPos: randXPos}));
      } else {
        this.enemies.push(new Koffing({speed: 6.5, xPos: randXPos, yPos: 250}));
        this.enemies.push(new Koffing({speed: 6.5, xPos: randXPos, yPos: 180}));
      }
    } else {
      if (generator < 0.2) {
        this.enemies.push(new Koffing({speed: 7, xPos: randXPos + 200, yPos: 250}));
        this.enemies.push(new Pokeball({xPos: randXPos, yPos: 300}))
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
    this.context.font = "700 60px Aclonica";
    this.context.fillStyle = "pink";
    this.context.fillText(`GAME OVER`, 625, 200);
    this.context.strokeText(`GAME OVER`, 625, 200);
    this.context.font = "700 24px Aclonica";
    this.context.fillStyle = "pink";
    this.context.fillText(`Press R to try again!`, 550, 250);
    this.context.strokeText(`Press R to try again!`, 550, 250);
    this.playAudio.pause();
    this.gameOver = true;
  }
}

module.exports = Game;
