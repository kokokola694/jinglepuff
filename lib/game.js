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
    if (!localStorage.getItem("highscores")) {
      localStorage.setItem("highscores", JSON.stringify([]));
    }

    this.player = new Player({xPos: 120, yPos: 280});

    this.setButtonListeners();
    this.setVisualAssets(backgroundContext, groundContext);

    this.canvas.focus();
    this.enemies = [];
    this.gameOver = false;
    this.transitioning = true;
    this.spawning = false;
    this.paused = false;

    this.jump = this.jump.bind(this);
    this.render = this.render.bind(this);
    this.restart = this.restart.bind(this);
    this.pause = this.pause.bind(this);
    this.mute = this.mute.bind(this);

    this.playAudio = new Audio('./assets/audio/shiver_star.mp3');
    this.playAudio.loop = true;
  }

  setButtonListeners() {
    this.canvas.addEventListener('keydown', (e) => this.jump(e));
    this.canvas.addEventListener('keydown', (e) => this.restart(e));
    this.canvas.addEventListener('keydown', (e) => this.pause(e));
    this.canvas.addEventListener('keydown', (e) => this.mute(e));
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

      document.getElementById("leaderboard").classList.add("hidden");

      this.start();
    }
  }

  render () {
    if (!this.gameOver && !this.paused) {
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

    document.getElementById("scores-list").innerHTML = "";

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

  pause(e) {
    if (!this.paused && !this.gameOver && !this.transitioning && e.code === 'KeyP') {
      e.preventDefault();
      this.paused = true;
      this.context.font = "700 60px Aclonica";
      this.context.fillStyle = "pink";
      this.context.fillText(`PAUSED`, 575, 200);
      this.context.strokeText(`PAUSED`, 575, 200);
      this.context.font = "700 24px Aclonica";
      this.context.fillStyle = "pink";
      this.context.fillText(`Press P to resume.`, 550, 250);
      this.context.strokeText(`Press P to resume.`, 550, 250);
      this.playAudio.pause();
    } else if (this.paused && e.code === 'KeyP') {
        e.preventDefault();
        this.paused = false;
        this.playAudio.play();
        this.render();
    }
  }

  mute(e) {
    if (!this.muted && e.code === 'KeyM') {
      e.preventDefault();
      this.playAudio.muted = true;
    } else if (this.muted && e.code === 'KeyM') {
      e.preventDefault();
      this.playAudio.muted = false;
    }
  }

  stop () {
    this.context.font = "700 60px Aclonica";
    this.context.fillStyle = "pink";
    this.context.fillText(`GAME OVER`, 625, 100);
    this.context.strokeText(`GAME OVER`, 625, 100);
    this.context.font = "700 24px Aclonica";
    this.context.fillStyle = "pink";
    this.context.fillText(`Press R to try again!`, 550, 150);
    this.context.strokeText(`Press R to try again!`, 550, 150);

    this.inputScore(this.score.currentScore);
    this.displayHighScores();

    this.playAudio.pause();
    this.gameOver = true;
  }

  inputScore(score) {
    let highScores = JSON.parse(localStorage.getItem("highscores"));
    highScores.push(score);
    highScores.sort(function(a,b) { return (b - a ) });

    if (highScores.length > 5) {
      highScores = highScores.slice(0,5);
    }

    localStorage.setItem("highscores", JSON.stringify(highScores));
  }

  displayHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highscores"));
    const leaderboard = document.getElementById("leaderboard");
    leaderboard.classList.remove("hidden");

    highScores.forEach((score,i) => {
      const li = document.createElement("LI");
      const text = document.createTextNode(score);
      li.appendChild(text);
      document.getElementById("scores-list").appendChild(li);
    })
  }
}

module.exports = Game;
