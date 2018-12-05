const Player = require('./player');
const Enemy = require('./enemy');
const Background = require('./background');
const Ground = require('./ground');
const Score = require('./score');
const Balloon = require('./balloon');
const Spawn = require('./spawn');
const CanvasText = require('./canvas_text');

class Game {
  constructor (backgroundContext, groundContext, canvas, canvasContext) {
    this.canvas = canvas;
    this.context = canvasContext;

    if (!localStorage.getItem("highscores")) {
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
  }

  setKeys() {
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
      this.balloon.render(this.context);
      this.background.render();
      this.ground.render();
    }
  }

  handleEntities() {
    let deleteIndex = null;
    this.spawning = false;

    this.entities.forEach((entity, i) => {
      entity.render(this.context);
      if (!this.player.invincible && this.player.collided(entity)) {
        if (entity.constructor.name === "Pokeball") {
          this.score.currentScore += entity.points;
          deleteIndex = i;
        } else {
          this.stop();
        }
      }
      if (entity.xPos < -100) deleteIndex = i;
      if (i === this.entities.length - 1 && entity.xPos < 320) {
        this.spawning = true;
      }
    })

    if (deleteIndex !== null) this.entities.splice(deleteIndex, 1);
  }

  handleTransition() {
    this.transitioning = true;
    CanvasText("TRANSITION", this.context, this.score);
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

  createSpawn() {
    this.entities = this.entities.concat(Spawn(this.score.frameCount));
  }

  stop () {
    CanvasText("GAME_OVER", this.context);
    this.inputScore(this.score.currentScore);
    this.displayHighScores();
    this.playAudio.pause();
    this.gameOver = true;
  }

// KEY LISTENERS
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
      this.entities = [];
      this.gameOver = false;
      this.transitioning = true;
      this.spawning = false;
      document.getElementById("leaderboard").classList.add("hidden");
      this.start();
    }
  }

  pause(e) {
    if (!this.paused && !this.gameOver && !this.transitioning && e.code === 'KeyP') {
      e.preventDefault();
      CanvasText("PAUSE", this.context)
      this.paused = true;
      this.playAudio.pause();
    } else if (this.paused && e.code === 'KeyP') {
        e.preventDefault();
        this.paused = false;
        this.playAudio.play();
        this.render();
    }
  }

  mute(e) {
    if (e.code === 'KeyM') {
      e.preventDefault();
      this.playAudio.muted = !this.playAudio.muted;
      this.player.jumpFX.muted = !this.player.jumpFX.muted;
      this.player.doubleJumpFX.muted = !this.player.doubleJumpFX.muted;
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

    highScores.forEach((score,i) => {
      const li = document.createElement("LI");
      const text = document.createTextNode(score);
      li.appendChild(text);
      document.getElementById("scores-list").appendChild(li);
    })
  }
}

module.exports = Game;
