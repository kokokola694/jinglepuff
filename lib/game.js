const Player = require('./player');
const Enemy = require('./enemy');
const Background = require('./background');
const Score = require('./score');
const Balloon = require('./balloon');
const Spawn = require('./spawn');
const CanvasText = require('./canvas_text');

class Game {
  constructor (backgroundContext, groundContext, canvas, canvasContext) {
    this.canvas = canvas;
    this.context = canvasContext;

    if (!(JSON.parse(localStorage.getItem("highscores")) instanceof Array)) {
      localStorage.setItem("highscores", JSON.stringify([]));
    }

    this.player = new Player({xPos: 120, yPos: 280});

    this.setKeys();
    this.setVisualAssets(backgroundContext, groundContext);

    this.canvas.focus();
    this.started = false;
    this.entities = [];
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
    this.invTimer = 0;
  }

  setKeys() {
    this.canvas.addEventListener('keydown', (e) => this.jump(e));
    this.canvas.addEventListener('keydown', (e) => this.restart(e));
    this.canvas.addEventListener('keydown', (e) => this.pause(e));
    this.canvas.addEventListener('keydown', (e) => this.mute(e));
    this.canvas.addEventListener('click', (e) => this.jump(e));
    this.canvas.addEventListener('click', (e) => this.restart(e));
  }

  setVisualAssets(backgroundContext, groundContext) {
    this.background = new Background(backgroundContext, "far");
    this.ground = new Background(groundContext, "near");
    this.balloon = new Balloon();
  }

  removePokeballs () {
    const pokeballs = document.getElementsByClassName("pb");
    for (let i = 0; i < pokeballs.length; i++) {
      pokeballs[i].src = './assets/images/black_ball.png';
    }
  }

  start() {
    document.getElementById("gameover-disp").classList.add("hidden");
    document.getElementById("item-list").classList.remove("hidden");
    this.removePokeballs();
    this.context.clearRect(0,0,900,400);
    this.score = new Score();
    this.started = true;
    this.playAudio.currentTime = 0;
    this.playAudio.play();
    document.getElementById("scores-list").innerHTML = "";
    this.render();
  }

  render () {
    if (!this.gameOver && !this.paused) {
      requestAnimationFrame(this.render);
      this.player.render(this.context);
      this.handleEntities();

      if (this.entities.length && this.transitioning) {
        this.spawning = false;
        this.score.render(this.context);
      } else if (this.transitioning) {
        this.spawning = false;
        this.handleTransition();
      } else if (!this.entities.length) {
        this.spawning = true;
        this.score.render(this.context);
      } else {
        this.score.render(this.context);
      }

      if (this.spawning) this.createSpawn();
      if (this.score.frameCount === 700 || this.score.frameCount === 1500) {
        this.transitioning = true;
      }

      if (this.invTimer > 0 && (this.entities.length || !this.transitioning)) {
        this.invTimer -= 1;
        if (this.invTimer > 690) {
          this.player.height = 60;
          this.player.width = 60;
          this.player.yPos = 270;
          this.player.xPos = 115;
        } else if (this.invTimer > 680) {
          this.player.height = 70;
          this.player.width = 70;
          this.player.yPos = 280;
        } else if (this.invTimer > 670) {
          this.player.height = 80;
          this.player.width = 80;

        }
        CanvasText("INVINCIBLE", this.context, null, this.invTimer);
      };
      if (this.invTimer === 1) {
        this.player.removeInv();
        this.removePokeballs();
      }

      this.balloon.render(this.context);
      this.background.render();
      this.ground.render();
    }
  }

  handleEntities() {
    let outIndex = null;
    this.spawning = false;

    this.entities.forEach((entity, i) => {
      entity.render(this.context);
      if (this.player.collided(entity)) {
        if (entity.constructor.name === "Pokeball") {
          this.score.currentScore += entity.points;
          this.score.addPointsDisp();
          if (!this.playAudio.muted) entity.pointFX.play();
          if (this.player.heldItems.length < 3) {
            this.player.heldItems.push(`pokeball`);
            const pokeBall = document.getElementById(`pokeball-${this.player.heldItems.length}`)
            pokeBall.src = "./assets/images/pokeball.png";
            if (this.player.heldItems.length === 3) {
              this.player.invincible = true;
              this.invTimer = 700;
            }
          };
          outIndex = i;
        } else if (this.player.invincible) {
          if (!entity.fainted) {
            entity.frameCount = 0;
            entity.fainted = true;
            if (!this.playAudio.muted) entity.faintFX.play();
          }
        } else if (!this.player.invincible) {
          this.end();
        }
      }
      if (entity.xPos < -100) outIndex = i;
      if (i === this.entities.length - 1 && entity.xPos < 350) {
        this.spawning = true;
      }
    })

    if (outIndex !== null) this.entities.splice(outIndex, 1);

  }

  handleTransition() {
    this.transitioning = true;
    CanvasText("TRANSITION", this.context, this.score);
    setTimeout(() => this.transitioning = false, 3000);
  }

  createSpawn() {
    this.entities = this.entities.concat(Spawn(this.score.frameCount));
  }

  end () {
    document.getElementById("gameover-disp").classList.remove("hidden");
    this.inputScore(this.score.currentScore);
    this.displayHighScores();
    this.playAudio.pause();
    this.gameOver = true;
  }

// KEY LISTENERS
  jump (e) {
    if ((e.code === 'Space' || e.button === 0) && !this.gameOver && this.started && !this.paused) {
      e.preventDefault();
      this.player.setJumpVel();
    }
  }

  restart(e) {
    if ((e.code === 'KeyR' || e.button === 0) && this.gameOver) {
      e.preventDefault();
      this.player.yPos = 280;
      this.entities = [];
      this.player.heldItems = [];
      this.gameOver = false;
      this.transitioning = true;
      this.spawning = false;
      document.getElementById("leaderboard").classList.add("hidden");
      this.start();
    }
  }

  pause(e) {
    if (!this.paused && !this.gameOver && this.started && (e.code === 'KeyP' || e === "button")) {
      if (e !== "button") e.preventDefault();
      this.paused = true;
      this.playAudio.pause();
      document.getElementById("pause-disp").classList.remove("hidden");
      document.getElementById("pause-btn").classList.add("selected");
    } else if (this.paused && this.started && (e.code === 'KeyP' || e === "button")) {
        if (e !== "button") e.preventDefault();
        this.paused = false;
        this.playAudio.play();
        document.getElementById("pause-disp").classList.add("hidden");
        document.getElementById("pause-btn").classList.remove("selected");
        this.render();
    }
  }

  mute(e) {
    if (e.code === 'KeyM' || e === "button") {
      if (e !== "button") e.preventDefault();
      this.playAudio.muted = !this.playAudio.muted;
      this.player.jumpFX.muted = !this.player.jumpFX.muted;
      this.player.doubleJumpFX.muted = !this.player.doubleJumpFX.muted;

      if (this.playAudio.muted) {
        document.getElementById("mute-disp").classList.remove("hidden");
        document.getElementById("mute-btn").classList.add("selected");
      } else {
        document.getElementById("mute-disp").classList.add("hidden");
        document.getElementById("mute-btn").classList.remove("selected");
      }

    }
  }

// HIGH SCORES
  inputScore(score) {
    let highScores = JSON.parse(localStorage.getItem("highscores"));
    highScores.push(score);
    highScores.sort(function(a,b) { return (b - a ) });

    if (highScores.length > 5) highScores = highScores.slice(0,5);
    localStorage.setItem("highscores", JSON.stringify(highScores));
  }

  displayHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highscores"));
    const leaderboard = document.getElementById("leaderboard");
    leaderboard.classList.remove("hidden");
    let highlighted = false;
    highScores.forEach((score,i) => {
      const li = document.createElement("LI");
      const text = document.createTextNode(score);
      li.appendChild(text);
      if (score === this.score.currentScore && !highlighted) {
        const classesToAdd = ["highscore", "blinking"];
        li.classList.add(...classesToAdd);
        highlighted = true;
      }
      document.getElementById("scores-list").appendChild(li);
    })
  }
}

module.exports = Game;
