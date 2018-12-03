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

class Background {
  constructor(context, src) {
    this.src = src;
    this.speed = 0.6;
    this.xPos = 0;
    this.context = context;
  }

  render () {
    const canvWidth = 900;
    const canvHeight = 400;
    this.context.clearRect(0, 0, canvWidth, canvHeight);
    this.context.drawImage(this.src,3,120,1794,773,this.xPos,0,canvWidth,canvHeight);
    this.context.drawImage(this.src,3,120,1794,773,this.xPos + canvWidth,0,canvWidth,canvHeight);
    if (this.xPos <= -canvWidth) {
      this.xPos = 0;
    }
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
    this.yPos = 50;
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

/***/ "./lib/enemy.js":
/*!**********************!*\
  !*** ./lib/enemy.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Enemy {
  constructor(props) {
    this.xPos = 950;
    this.yPos = 250;
    this.width = 70;
    this.height = 70;
    this.speed = 5;
    this.renderCount = 0;
  }

  setSprite(context) {
    context.fillStyle = "blue";
    context.fillRect(this.xPos,
      this.yPos, this.width, this.height);
  }

  render(context) {
    this.setSprite(context);
    this.xPos -= this.speed;
    this.renderCount += 1;
  }

  // hitbox() {
  //   return {
  //     minX: this.xPos, maxX: this.xPos + this.width,
  //     minY: this.yPos, maxY: this.yPos + this.height,
  //   };
  // }
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

class Koffing extends Enemy {
  constructor(props) {
    super(props);
    this.xPos = props.xPos;
    this.yPos = props.yPos;
    this.width = 70;
    this.height = 70;
    this.speed = props.speed;

    this.sprites = new Image();
    this.sprites.src = './assets/images/koffing-sprites.png';
  }

  setSprite(context) {
    if (this.renderCount < 15) {
      context.drawImage (
        this.sprites,0,2,36,36,this.xPos,this.yPos,this.width,this.height
      );
    } else if (this.renderCount < 30) {
      context.drawImage (
        this.sprites,38,2,36,36,this.xPos,this.yPos,this.width,this.height
      );
    } else if (this.renderCount < 45) {
      context.drawImage (
        this.sprites,76,2,36,36,this.xPos,this.yPos,this.width,this.height
      );
    } else if (this.renderCount < 60) {
      context.drawImage (
        this.sprites,38,2,36,36,this.xPos,this.yPos,this.width,this.height
      );
      this.renderCount = 0;
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

class Meowth extends Enemy {
  constructor(props) {
    super(props);
    this.xPos = props.xPos;
    this.yPos = 280;
    this.width = 50;
    this.height = 50;
    this.speed = 3;
    this.attackPos = 650 + Math.floor(Math.random()*30);

    this.sprites = new Image();
    this.sprites.src = './assets/images/meowth-sprites.png';
  }

  setSprite(context) {
    if (this.xPos >= this.attackPos + 150) {
      context.drawImage(this.sprites,2,210,39,45,this.xPos,this.yPos,this.width,this.height);
    } else if (this.xPos >= this.attackPos + 120) {
      context.drawImage(this.sprites,41,210,42,45,this.xPos,this.yPos,this.width,this.height);
    } else if (this.xPos >= this.attackPos) {
      context.drawImage(this.sprites,84,210,45,47,this.xPos,this.yPos,this.width,this.height);
    } else if (this.xPos < this.attackPos) {
      context.drawImage(this.sprites,298,211,40,46,this.xPos,this.yPos,this.width,this.height);
    }
  }

  render(context) {
    this.setSprite(context);
    // context.fillStyle = "blue";
    // context.fillRect(this.xPos,
      // this.yPos, this.width, this.height);
    // context.drawImage(this.sprites,175,211,45,45,this.xPos,this.yPos,this.width,this.height);
    if (this.xPos > 50 && this.xPos < this.attackPos) {
      this.speed = 30;
    } else {
      this.speed = 3;
    }
    this.xPos -= this.speed;
    this.renderCount += 1;
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
const Koffing = __webpack_require__(/*! ./enemy_koffing */ "./lib/enemy_koffing.js");
const Meowth = __webpack_require__(/*! ./enemy_meowth */ "./lib/enemy_meowth.js");
const Background = __webpack_require__(/*! ./background */ "./lib/background.js");
const Ground = __webpack_require__(/*! ./ground */ "./lib/ground.js");
const Score = __webpack_require__(/*! ./score */ "./lib/score.js");
const Balloon = __webpack_require__(/*! ./balloon */ "./lib/balloon.js");

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
  }

  setButtonListeners() {
    this.canvas.addEventListener('keydown', (e) => this.jump(e));
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
    if (e.code === 'Space') {
      e.preventDefault();
      this.player.setJumpVel();
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
    this.gameOver = true;
  }
}

module.exports = Game;


/***/ }),

/***/ "./lib/ground.js":
/*!***********************!*\
  !*** ./lib/ground.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Ground {
  constructor(context, src) {
    this.src = src;
    this.speed = 3;
    this.xPos = 0;
    this.context = context;
  }

  render () {
    const canvWidth = 900;
    const canvHeight = 400;
    this.context.clearRect(0, 0, canvWidth, canvHeight);
    this.context.drawImage(this.src,15,0,1170,800,this.xPos,-100,canvWidth,canvHeight+100);
    this.context.drawImage(this.src,15,0,1170,800,this.xPos + canvWidth,-100,canvWidth,canvHeight+100);
    if (this.xPos <= -canvWidth) {
      this.xPos = 0;
    }
    this.xPos -= this.speed;
  }
}

module.exports = Ground;


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

  const game = new Game(
    backgroundContext,
    groundContext,
    canvas,
    canvasContext,
  );

  game.start();

});


/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

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
    this.sprites = new Image();
    this.sprites.src = './assets/images/jigglypuff-sprites.png';
    this.renderCount = 0;
  }

  jump() {
    const gravity = 0.25;
    if (this.jumping) {
      if (this.yPos === 290 || this.yPos < 290) {
        this.vel += gravity;
        this.yPos += this.vel;
      } else {
        this.yPos = 290;
        this.vel = 0;
        this.jumping = false;
        this.doubleJumping = false;
      }
    }
  }

  setJumpVel() {
    if (!this.jumping) {
      this.jumping = true;
      this.vel = -7.3;
      this.jumpFX.play();
    } else if (!this.doubleJumping) {
      this.doubleJumping = true;
      this.vel = -7;
      this.jumpFX.play();
    }
  }

  setSprite(context) {
    const frames = 9;
    if (this.vel > 0) {
      context.drawImage (
        this.sprites,125,6,26,26,this.xPos,this.yPos,this.width,this.height
      );
      this.renderCount = 0;
    } else if (this.jumping) {
      context.drawImage (
        this.sprites,160,5,26,26,this.xPos,this.yPos,this.width,this.height
      );
      this.renderCount = 0;
    } else if (this.renderCount < frames*1) {
      context.drawImage (
        this.sprites,281,5,26,26,this.xPos,this.yPos,this.width,this.height
      );
    } else if (this.renderCount < frames*2) {
      context.drawImage (
        this.sprites,252,5,26,26,this.xPos,this.yPos,this.width,this.height
      );
    } else if (this.renderCount < frames*3) {
      context.drawImage (
        this.sprites,223,5,26,26,this.xPos,this.yPos,this.width,this.height
      );
    } else if (this.renderCount < frames*4) {
      context.drawImage (
        this.sprites,195,5,26,26,this.xPos,this.yPos,this.width,this.height
      );
    } else if (this.renderCount < frames*5) {
      context.drawImage (
        this.sprites,252,5,26,26,this.xPos,this.yPos,this.width,this.height
      );
    } else if (this.renderCount < frames*6) {
      context.drawImage (
        this.sprites,223,5,26,26,this.xPos,this.yPos,this.width,this.height
      );
      this.renderCount = 0;
    }
  }

  render (context) {
    context.clearRect(0,0,900,400);
    this.setSprite(context);
    this.jump();
    this.renderCount += 1;
  }

  collided (object) {
    const playerCenterX = this.xPos + this.width/2;
    const playerCenterY = this.yPos + this.height/2;
    const objectCenterX = object.xPos + object.width/2;
    const objectCenterY = object.yPos + object.height/2;
    const dx = playerCenterX - objectCenterX;
    const dy = playerCenterY - objectCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < (this.width-8)/2 + (object.width-8)/2;
    // return !(
    //   this.hitbox().maxX < object.hitbox().minX ||
    //   this.hitbox().minX > object.hitbox().maxX ||
    //   this.hitbox().maxY < object.hitbox().minY ||
    //   this.hitbox().minY > object.hitbox().maxY
    // );
  }

  // hitbox() {
  //   return {
  //     minX: this.xPos,
  //     maxX: this.xPos + this.width,
  //     minY: this.yPos,
  //     maxY: this.yPos + this.height,
  //   };
  // }
}

module.exports = Player;


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
  }

  render (context) {
    context.font = "700 26px Arial";
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.fillText("Score: " + this.currentScore, 850, 35);
    context.strokeText("Score: " + this.currentScore, 850, 35);
    context.textAlign = "end";
    context.fillText("Level: " + this.currentLevel, 150, 35);
    context.strokeText("Level: " + this.currentLevel, 150, 35);

    this.update();
    this.levelcheck();
  }

  update() {
    this.currentScore += 3;
    this.frameCount += 1;
  }

  levelcheck () {
    if (this.frameCount === 500) {
      this.currentLevel = 2;
    } else if (this.frameCount === 1000) {
      this.currentLevel = 3;
    }
  }
}

module.exports = Score;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map