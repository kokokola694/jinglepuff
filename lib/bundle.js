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
    this.speed = 0.5;
    this.xPos = 0;
    this.context = context;
  }

  render () {
    const canvWidth = 900;
    const canvHeight = 400;
    this.context.clearRect(0, 0, canvWidth, canvHeight);
    this.context.drawImage(this.src,0,350,1200,450,this.xPos,0,canvWidth,canvHeight);
    this.context.drawImage(this.src,0,350,1200,450,this.xPos + canvWidth,0,canvWidth,canvHeight);
    if (this.xPos <= -canvWidth) {
      this.xPos = 0;
    }
    this.xPos -= this.speed;
  }
}

module.exports = Background;


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

    this.sprites = new Image();
    this.sprites.src = './assets/images/koffing-sprites.png';
    this.renderCount = 0;
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

  render(context) {
    context.fillStyle = "blue";
    context.fillRect(this.xPos,
      this.yPos, this.width, this.height);
    this.setSprite(context);

    this.xPos -= this.speed;
    this.renderCount += 1;
  }

  hitbox() {
    return {
      minX: this.xPos, maxX: this.xPos + this.width,
      minY: this.yPos, maxY: this.yPos + this.height,
    };
  }
}

module.exports = Enemy;


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
      this.player.render(this.context);
      let deleteIndex = null;
      this.enemies.forEach((enemy, i) => {
        enemy.render(this.context);
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
      this.score.render(this.context);
    }
  }

  start() {
    this.score = new Score();
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

  const game = new Game(
    backgroundContext,
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
    this.width = 40;
    this.height = 40;
    this.vel = 0;
    this.jumping = false;
    this.doubleJumping = false;

    this.sprites = new Image();
    this.sprites.src = './assets/images/jigglypuff-sprites.png';
    this.renderCount = 0;
  }

  jump() {
    const gravity = 0.2;
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
      this.vel = -6;
    } else if (!this.doubleJumping) {
      this.doubleJumping = true;
      this.vel = -6;
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
    // context.fillStyle = "red";
    // context.fillRect(this.xPos,
    //   this.yPos, this.width, this.height);

    this.setSprite(context);
    this.jump();
    this.renderCount += 1;
  }

  collided (object) {
    return !(
      this.hitbox().maxX < object.hitbox().minX ||
      this.hitbox().minX > object.hitbox().maxX ||
      this.hitbox().maxY < object.hitbox().minY ||
      this.hitbox().minY > object.hitbox().maxY
    );
  }

  hitbox() {
    return {
      minX: this.xPos,
      maxX: this.xPos + this.width,
      minY: this.yPos,
      maxY: this.yPos + this.height,
    };
  }
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
  }

  render (context) {
    context.font = "26px Arial";
    context.fillStyle = "white";
    context.fillText("Score: " + this.currentScore, 850, 35);
    context.textAlign = "end";
    this.currentScore += 3;
  }
}

module.exports = Score;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map