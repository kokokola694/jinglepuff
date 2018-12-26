/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/jinglepuff.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/background.js":
/*!***************************!*\
  !*** ./lib/background.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 900;

const FAR_BG = {
  speed: 0.6,
  src: './assets/images/winter1.png',
  imgCoord: [3,120,1794,773],
  canvasCoord1: [null, 0, CANVAS_WIDTH, CANVAS_HEIGHT],
  canvasCoord2: [null, 0, CANVAS_WIDTH, CANVAS_HEIGHT]
}

const NEAR_BG = {
  speed: 3,
  src: './assets/images/snow_houses.png',
  imgCoord: [15,0,1170,800],
  canvasCoord1: [null, -100, CANVAS_WIDTH, CANVAS_HEIGHT + 100],
  canvasCoord2: [null, -100, CANVAS_WIDTH, CANVAS_HEIGHT + 100]
}

class Background {
  constructor(context, description) {
    this.options = description === "far" ? FAR_BG : NEAR_BG;
    this.speed = this.options["speed"];
    this.xPos = 0;
    this.context = context;

    this.img = new Image();
    this.img.src = this.options["src"];
    this.draw = this.draw.bind(this);
  }

  draw() {
    this.context.drawImage (
      this.img,
      this.options["imgCoord"][0],
      this.options["imgCoord"][1],
      this.options["imgCoord"][2],
      this.options["imgCoord"][3],
      this.options["canvasCoord1"][0],
      this.options["canvasCoord1"][1],
      this.options["canvasCoord1"][2],
      this.options["canvasCoord1"][3]
    );
    this.context.drawImage (
      this.img,
      this.options["imgCoord"][0],
      this.options["imgCoord"][1],
      this.options["imgCoord"][2],
      this.options["imgCoord"][3],
      this.options["canvasCoord2"][0],
      this.options["canvasCoord2"][1],
      this.options["canvasCoord2"][2],
      this.options["canvasCoord2"][3]
    );
  }

  render () {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.options["canvasCoord1"][0] = this.xPos;
    this.options["canvasCoord2"][0] = this.xPos + CANVAS_WIDTH;
    this.draw();
    if (this.xPos <= -CANVAS_WIDTH) this.xPos = 0;
    this.xPos -= this.speed;
  }
}

module.exports = Background;


/***/ }),

/***/ "./lib/balloon.js":
/*!************************!*\
  !*** ./lib/balloon.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Balloon {
  constructor(props) {
    this.xPos = 700;
    this.yPos = 40;
    this.sprites = new Image();
    this.sprites.src = './assets/images/balloon.png';
    this.frameCount = 0;
  }

  setSprite(context) {
    const frames = 20;
    if (this.frameCount < frames * 1) {
      context.drawImage(this.sprites, 0, 0, 477, 500, this.xPos, this.yPos, 143, 150);
    } else if (this.frameCount < frames * 2) {
      context.drawImage(this.sprites, 0, 0, 477, 500, this.xPos, this.yPos + 1, 143, 150)
    } else if (this.frameCount < frames * 3) {
      context.drawImage(this.sprites, 0, 0, 477, 500, this.xPos, this.yPos + 2, 143, 150)
    } else if (this.frameCount < frames * 4) {
      context.drawImage(this.sprites, 0, 0, 477, 500, this.xPos, this.yPos + 1, 143, 150)
      this.frameCount = 0;
    }
  }

  render(context) {
    this.setSprite(context);
    this.frameCount += 1;
  }
}

module.exports = Balloon;


/***/ }),

/***/ "./lib/canvas_text.js":
/*!****************************!*\
  !*** ./lib/canvas_text.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

const levelText = (level) => {
  switch (level) {
    case 1:
      return "Press SPACE to jump! Press twice to double jump!";
    case 2:
      return "Collect PokeBalls for bonus points and powerups!";
    case 3:
      return "WATCH OUT! Meowth is a faster enemy Pokemon!";
    case 4:
      return "Enemies will be faster and harder to avoid!"
  }
}

const CanvasText = (info, context, score, invTimer) => {
  switch (info) {
    case "TRANSITION":
      context.font = "700 50px Aclonica";
      context.fillStyle = "pink";
      context.fillText(`LEVEL ${score.currentLevel}`, 450, 200);
      context.strokeText(`LEVEL ${score.currentLevel}`, 450, 200);
      context.font = "500 30px Aclonica";
      context.fillText(`${levelText(score.currentLevel)}`, 450, 250);
      context.strokeText(`${levelText(score.currentLevel)}`, 450, 250);
      context.textAlign = "center";
      break;
    case "INVINCIBLE":
      context.font = "700 60px Aclonica";
      context.fillStyle = "gold";
      context.fillText(`${invTimer}`, 450, 130);
      context.strokeText(`${invTimer}`, 450, 130);
      context.font = "700 30px Aclonica";
      context.fillText(`INVINCIBLE`, 450, 170);
      context.strokeText(`INVINCIBLE`, 450, 170);
      break;

  }
}

module.exports = CanvasText;


/***/ }),

/***/ "./lib/enemy.js":
/*!**********************!*\
  !*** ./lib/enemy.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Enemy {
  constructor(props) {
    this.xPos = props.xPos;
    this.yPos = props.yPos;
    this.speed = props.speed;
    this.width = 50;
    this.height = 50;
    this.frameCount = 0;
    this.faintFX = new Audio('./assets/audio/gameboy.mp3');

  }

  renderSprite(context) {
    context.fillStyle = "blue";
    context.fillRect(this.xPos,
      this.yPos, this.width, this.height);
  }

  render(context) {
    this.renderSprite(context);
    this.xPos -= this.speed;
    this.frameCount += 1;
  }
}

module.exports = Enemy;


/***/ }),

/***/ "./lib/enemy_koffing.js":
/*!******************************!*\
  !*** ./lib/enemy_koffing.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Enemy = __webpack_require__(/*! ./enemy */ "./lib/enemy.js");

const KOFFING_SPRITES = {"reg1":[0,2,36,36], "reg2":[38,2,36,36],
  "reg3":[76,2,36,36], "faint1": [0, 160, 45, 45], "faint2": [46, 152, 58, 58],
  "faint3": [105, 149, 66, 66]};

class Koffing extends Enemy {
  constructor(props) {
    super(props);
    this.width = 70;
    this.height = 70;
    this.fainted = false;

    this.sprites = new Image();
    this.sprites.src = './assets/images/koffing-sprites.png';
  }

  extractSprite(context, coordinates, extra = 0) {
    context.drawImage (this.sprites, coordinates[0], coordinates[1],
      coordinates[2], coordinates[3], this.xPos - extra/2, this.yPos - extra/2,
      this.width + extra, this.height + extra);
  }

  renderSprite(context) {
    if (this.fainted) {
      if (this.frameCount < 5) {
        this.extractSprite(context, KOFFING_SPRITES["faint1"]);
      } else if (this.frameCount < 11) {
        this.extractSprite(context, KOFFING_SPRITES["faint2"], 35);
      } else {
        this.extractSprite(context, KOFFING_SPRITES["faint3"], 60);
      }
    } else {
      if (this.frameCount < 15) {
        this.extractSprite(context, KOFFING_SPRITES["reg1"]);
      } else if (this.frameCount < 30) {
        this.extractSprite(context, KOFFING_SPRITES["reg2"]);
      } else if (this.frameCount < 45) {
        this.extractSprite(context, KOFFING_SPRITES["reg3"]);
      } else if (this.frameCount < 60) {
        this.extractSprite(context, KOFFING_SPRITES["reg2"]);
        this.frameCount = 0;
      }
    }
  }
}

module.exports = Koffing;


/***/ }),

/***/ "./lib/enemy_meowth.js":
/*!*****************************!*\
  !*** ./lib/enemy_meowth.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Enemy = __webpack_require__(/*! ./enemy */ "./lib/enemy.js");

const MEOWTH_SPRITES = {"prep1":[2,210,39,45], "prep2":[41,210,42,45],
  "prep3":[84,210,45,47], "attack":[298,211,40,46], "faint1":[41, 165, 36, 45],
  "faint2":[77, 163, 35, 46],"faint3":[2, 60, 47, 44]};

class Meowth extends Enemy {
  constructor(props) {
    super(props);
    this.yPos = 280;
    this.speed = 3;
    this.attackPos = 650 + Math.floor(Math.random()*30);
    this.fainted = false;
    this.sprites = new Image();
    this.sprites.src = './assets/images/meowth-sprites.png';
  }

  extractSprite(context, coordinates, extra = 0) {
    context.drawImage (this.sprites, coordinates[0], coordinates[1],
      coordinates[2], coordinates[3], this.xPos, this.yPos, this.width + extra, this.height);
  }

  renderSprite(context) {
    if (this.fainted) {
      if (this.frameCount < 5) {
        this.extractSprite(context, MEOWTH_SPRITES["faint1"]);
      } else if (this.frameCount < 11) {
        this.extractSprite(context, MEOWTH_SPRITES["faint2"]);
      } else {
        this.extractSprite(context, MEOWTH_SPRITES["faint3"], 15);
      }
    } else {
      if (this.xPos >= this.attackPos + 150) {
        this.extractSprite(context, MEOWTH_SPRITES["prep1"]);
      } else if (this.xPos >= this.attackPos + 120) {
        this.extractSprite(context, MEOWTH_SPRITES["prep2"]);
      } else if (this.xPos >= this.attackPos) {
        this.extractSprite(context, MEOWTH_SPRITES["prep3"]);
      } else if (this.xPos < this.attackPos) {
        this.extractSprite(context, MEOWTH_SPRITES["attack"]);
      }
    }

  }

  render(context) {
    if (this.xPos > 50 && this.xPos < this.attackPos && !this.fainted) {
      this.speed = 12;
    } else {
      this.speed = 3;
    }
    super.render(context);
  }
}

module.exports = Meowth;


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(/*! ./player */ "./lib/player.js");
const Enemy = __webpack_require__(/*! ./enemy */ "./lib/enemy.js");
const Background = __webpack_require__(/*! ./background */ "./lib/background.js");
const Score = __webpack_require__(/*! ./score */ "./lib/score.js");
const Balloon = __webpack_require__(/*! ./balloon */ "./lib/balloon.js");
const Spawn = __webpack_require__(/*! ./spawn */ "./lib/spawn.js");
const CanvasText = __webpack_require__(/*! ./canvas_text */ "./lib/canvas_text.js");

const LEVEL_FRAMES = [400, 1500, 2500];

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
        document.getElementById('score-pickup').classList.add('hidden');
      } else if (!this.entities.length) {
        this.spawning = true;
        this.score.render(this.context);
      } else {
        this.score.render(this.context);
      }

      if (this.spawning) this.createSpawn();
      if (LEVEL_FRAMES.includes(this.score.frameCount)) {
        this.transitioning = true;
      }

      if (this.invTimer > 0 && (this.entities.length || !this.transitioning)) {
        this.invTimer -= 1;
        if (this.invTimer > 1) CanvasText("INVINCIBLE", this.context, null, this.invTimer);
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
        } else if (!this.player.invincible && !entity.fainted) {
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


/***/ }),

/***/ "./lib/item.js":
/*!*********************!*\
  !*** ./lib/item.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Item {
  constructor (props) {
    this.xPos = props.xPos;
    this.yPos = props.yPos;
    this.width = 50;
    this.height = 50;
    this.speed = 3;
  }

  setSprite(context) {
    context.fillStyle = "green";
    context.fillRect(this.xPos,
      this.yPos, this.width, this.height);
  }

  render(context) {
    this.setSprite(context);
    this.xPos -= this.speed;
  }
}

module.exports = Item;


/***/ }),

/***/ "./lib/jinglepuff.js":
/*!***************************!*\
  !*** ./lib/jinglepuff.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game.js */ "./lib/game.js");

document.addEventListener('DOMContentLoaded', ()=> {
  const canvas = document.getElementById('canvas');
  const canvasContext = canvas.getContext('2d');
  const background = document.getElementById('background');
  const backgroundContext = background.getContext('2d');
  const ground = document.getElementById('ground');
  const groundContext = ground.getContext('2d');

  const muteButton = document.getElementById('mute-btn');
  const pauseButton = document.getElementById('pause-btn');

  const openModal = document.getElementById("open-modal");
  const modal = document.getElementById('instructions');
  const exitButton = document.getElementById("modal-close");

  const game = new Game(
    backgroundContext,
    groundContext,
    canvas,
    canvasContext,
  );

  openModal.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (!game.paused) game.pause("button");
    modal.style.display = "block";
  });

  exitButton.addEventListener('mousedown', (e) => {
    e.preventDefault();
    modal.style.display = "none";
    if (game.paused) game.pause("button");
    canvas.focus();
  });

  window.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
      if (game.paused) game.pause("button");
      canvas.focus();
    }
  };

  muteButton.addEventListener('mousedown', (e) => {
    e.preventDefault();
    game.mute("button");
    canvas.focus();
  })

  pauseButton.addEventListener('mousedown', (e) => {
    e.preventDefault();
    game.pause("button");
    canvas.focus();
  })

  canvas.addEventListener('mousedown', () => {
    const titleScreen = document.getElementById('title-screen');
    titleScreen.classList.add('hidden');
    if (!game.started) game.start();
  });

});


/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

const GRAVITY = 0.25;
const GROUND_YPOS = 280;
const SPRITES = {"fall": [125,6,26,26], "jump":[160,5,26,26],
  "walk1":[281,5,26,26], "walk2": [252,5,26,26], "walk3": [223,5,26,26],
  "walk4":[195,5,26,26]};

const PARTICLES = {"frame1": [2, 2, 40, 40], "frame2":[51, 2, 46, 46],
  "frame3": [149, 2, 46, 46], "frame4": [198, 2, 46, 46], "frame5": [394, 2, 46, 46],
  "frame6": [2, 52, 46, 46], "frame7": [149, 52, 46, 46], "frame8": [2, 100, 46, 46],
  "frame9": [100, 100, 46, 46], "frame10": [296, 100, 46, 46], "frame11":[2, 149, 46, 46],
  "frame12": [100, 148, 46, 46]}

class Player {
  constructor(props) {
    this.xPos = props.xPos;
    this.yPos = props.yPos;
    this.width = 50;
    this.height = 50;
    this.vel = 0;
    this.jumping = false;
    this.doubleJumping = false;
    this.invincible = false;
    this.jumpFX = new Audio('./assets/audio/jump_02.wav');
    this.doubleJumpFX = new Audio('./assets/audio/jump_02.wav');
    this.sprites = new Image();
    this.sprites.src = './assets/images/jigglypuff-sprites.png';
    this.particles = new Image();
    this.particles.src = './assets/images/invincible_particle.png';
    this.frameCount = 0;
    this.particleFrameCount = 0;
    this.heldItems = [];
  }

  removeInv() {
    this.invincible = false;
    this.heldItems = [];
    this.width = 50;
    this.height = 50;
  }

  renderJump() {
    if (this.jumping) {
      if (this.yPos <= GROUND_YPOS) {
        this.vel += GRAVITY;
        this.yPos += this.vel;
      } else {
        this.yPos = GROUND_YPOS;
        this.vel = 0;
        this.jumping = false;
        this.doubleJumping = false;
      }
    }
  }

  setJumpVel() {
    if (!this.jumping) {
      this.jumping = true;
      this.vel = -8;
      this.jumpFX.play();
    } else if (!this.doubleJumping) {
      this.doubleJumping = true;
      this.vel = -6.8;
      this.doubleJumpFX.play();
    }
  }

  extractSprite(context, coordinates, sprites, extraSize = 0) {
    context.drawImage(sprites, coordinates[0], coordinates[1],
      coordinates[2], coordinates[3], this.xPos - extraSize/2, this.yPos - extraSize/2,
      this.width + extraSize, this.height + extraSize);
  }

  renderInvincible(context) {
    const frames = 5;
    if (this.particleFrameCount < frames*1) {
      this.extractSprite(context, PARTICLES["frame1"], this.particles, 40);
    } else if (this.particleFrameCount < frames*2) {
      this.extractSprite(context, PARTICLES["frame2"], this.particles, 40);
    } else if (this.particleFrameCount < frames*3) {
      this.extractSprite(context, PARTICLES["frame3"], this.particles, 40);
    } else if (this.particleFrameCount < frames*4) {
      this.extractSprite(context, PARTICLES["frame4"], this.particles, 40);
    } else if (this.particleFrameCount < frames*5) {
      this.extractSprite(context, PARTICLES["frame5"], this.particles, 40);
    } else if (this.particleFrameCount < frames*6) {
      this.extractSprite(context, PARTICLES["frame6"], this.particles, 40);
    } else if (this.particleFrameCount < frames*7) {
      this.extractSprite(context, PARTICLES["frame7"], this.particles, 40);
    } else if (this.particleFrameCount < frames*8) {
      this.extractSprite(context, PARTICLES["frame8"], this.particles, 40);
    } else if (this.particleFrameCount < frames*9) {
      this.extractSprite(context, PARTICLES["frame9"], this.particles, 40);
    } else if (this.particleFrameCount < frames*10) {
      this.extractSprite(context, PARTICLES["frame10"], this.particles, 40);
    } else if (this.particleFrameCount < frames*11) {
      this.extractSprite(context, PARTICLES["frame11"], this.particles, 40);
    } else {
      this.extractSprite(context, PARTICLES["frame12"], this.particles, 40);
      this.particleFrameCount = 0;
    }
  }

  renderSprite(context) {
    const frames = 9;
    if (this.vel > 0) {
      this.extractSprite(context, SPRITES["fall"], this.sprites);
      this.frameCount = 0;
    } else if (this.jumping) {
      this.extractSprite(context, SPRITES["jump"], this.sprites);
      this.frameCount = 0;

    } else if (this.frameCount < frames*1) {
      this.extractSprite(context, SPRITES["walk1"], this.sprites);
    } else if (this.frameCount < frames*2) {
      this.extractSprite(context, SPRITES["walk2"], this.sprites);
    } else if (this.frameCount < frames*3) {
      this.extractSprite(context, SPRITES["walk3"], this.sprites);
    } else if (this.frameCount < frames*4) {
      this.extractSprite(context, SPRITES["walk4"], this.sprites);
    } else if (this.frameCount < frames*5) {
      this.extractSprite(context, SPRITES["walk3"], this.sprites);
    } else if (this.frameCount < frames*6) {
      this.extractSprite(context, SPRITES["walk2"], this.sprites);
      this.frameCount = 0;
    }
  }

  render (context) {
    context.clearRect(0,0,900,400);
    this.renderSprite(context);
    if (this.invincible) this.renderInvincible(context);
    this.renderJump();
    this.frameCount += 1;
    this.particleFrameCount += 1;
  }

  collided (object) {
    const playerCenterX = this.xPos + this.width/2;
    const playerCenterY = this.yPos + this.height/2;
    const objectCenterX = object.xPos + object.width/2;
    const objectCenterY = object.yPos + object.height/2;

    const dx = playerCenterX - objectCenterX;
    const dy = playerCenterY - objectCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (this.width-8)/2 + (object.width-8)/2;
  }
}

module.exports = Player;


/***/ }),

/***/ "./lib/pokeball.js":
/*!*************************!*\
  !*** ./lib/pokeball.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Item = __webpack_require__(/*! ./item */ "./lib/item.js");

class Pokeball extends Item {
  constructor(props) {
    super(props);

    this.sprites = new Image();
    this.sprites.src = './assets/images/pokeball.png';
    this.points = 500;
    this.pointFX = new Audio('./assets/audio/gameboy.mp3');
  }

  setSprite(context) {
    context.drawImage(this.sprites, 0, 0, 1024, 1024,
      this.xPos, this.yPos, this.width, this.height);
  }
}

module.exports = Pokeball;


/***/ }),

/***/ "./lib/score.js":
/*!**********************!*\
  !*** ./lib/score.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Score {
  constructor (props) {
    this.currentScore = 0;
    this.frameCount = 0;
    this.currentLevel = 1;
    this.plusPointTimer = 0;
    document.getElementById('score-pickup').classList.add('hidden');

  }

  display(context) {
    context.textAlign = "center";
    context.font = "24px Aclonica";
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.fillText("SCORE", 250, 35);
    context.strokeText("SCORE", 250, 35);
    context.fillText(this.currentScore, 250, 75);
    context.strokeText(this.currentScore, 250, 75);
    context.fillText("LEVEL " + this.currentLevel, 100, 35);
    context.strokeText("LEVEL " + this.currentLevel, 100, 35);

  }

  addPointsDisp () {
    this.plusTimer = 100;
    document.getElementById('score-pickup').classList.remove('hidden');
  }

  render (context) {
    this.display(context);
    this.update();
    this.levelcheck();
  }

  update() {
    this.currentScore += 3;
    this.frameCount += 1;
    if (this.plusTimer > 0) this.plusTimer -= 1;
    if (this.plusTimer === 1) {
      document.getElementById('score-pickup').classList.add('hidden');
    }
  }

  levelcheck () {
    if (this.frameCount === 400) {
      this.currentLevel = 2;
    } else if (this.frameCount === 1500) {
      this.currentLevel = 3;
    } else if (this.frameCount === 2500) {
      this.currentLevel = 4;
    }
  }
}

module.exports = Score;


/***/ }),

/***/ "./lib/spawn.js":
/*!**********************!*\
  !*** ./lib/spawn.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Koffing = __webpack_require__(/*! ./enemy_koffing */ "./lib/enemy_koffing.js");
const Meowth = __webpack_require__(/*! ./enemy_meowth */ "./lib/enemy_meowth.js");
const Pokeball = __webpack_require__(/*! ./pokeball */ "./lib/pokeball.js");

const Spawn = (level) => {
  const randXPos = Math.floor(Math.random() * 50) + 950;
  const generator = Math.random();
  // Level 1
  if (level <= 400) {
    return [
      new Koffing({speed: 5, xPos: randXPos, yPos: 250})
    ];
  // Level 2
} else if (level <= 1500) {
    if (generator < 0.6) {
      return [
        new Koffing({speed: 5, xPos: randXPos + 200, yPos: 250}),
        new Pokeball({xPos: randXPos, yPos: 300})
      ];
    } else {
      return [
        new Koffing({speed: 5, xPos: randXPos, yPos: 250}),
        new Pokeball({xPos: randXPos, yPos: 200})
      ];
    }
  // Level 3
} else if (level <= 2500) {
    if (generator < 0.3) {
      return [
        new Koffing({speed: 6.5, xPos: randXPos + 100, yPos: 250}),
        new Pokeball({xPos: randXPos, yPos: 200})
      ];
    } else {
      return [
        new Meowth({xPos: randXPos + 100}),
        new Pokeball({xPos: randXPos, yPos: 200})
      ];
    }
  // Level 4
  } else {
    if (generator < 0.2) {
      return [
        new Koffing({speed: 7, xPos: randXPos + 200, yPos: 250}),
        new Pokeball({xPos: randXPos, yPos: 300})
      ];
    } else if (generator < 0.4) {
      return [
        new Meowth({xPos: randXPos + 100}),
        new Pokeball({xPos: randXPos, yPos: 200})
      ]
    } else if (generator < 0.7) {
      return [
        new Koffing({speed: 7, xPos: randXPos, yPos: 250}),
        new Koffing({speed: 7, xPos: randXPos, yPos: 180}),
        new Pokeball({xPos: randXPos, yPos: 200})
      ];
    } else {
      return [
        new Koffing({speed: 7, xPos: randXPos, yPos: 180}),
        new Meowth({xPos: randXPos - 20})
      ]
    }
  }
}

module.exports = Spawn;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map