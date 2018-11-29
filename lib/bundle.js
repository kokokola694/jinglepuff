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

/***/ "./lib/enemy.js":
/*!**********************!*\
  !*** ./lib/enemy.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Enemy {
  constructor(props) {
    this.xPos = 825;
    this.yPos = 170;
    this.width = 60;
    this.height = 60;
    this.speed = 5;
    this.sprites = new Image();
    this.sprites.src = './assets/images/koffing-sprites.png';
  }

  draw(context) {
    context.drawImage(
      this.sprites,
      0,
      0,
      38,
      38,
      this.xPos,
      this.yPos,
      this.width,
      this.height
    );
  }

  update(context) {
    this.draw(context);
    this.xPos -= this.speed;
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

class Game {
  constructor (canvas, canvasContext) {
    this.canvas = canvas;
    this.context = canvasContext;

    this.player = new Player({xPos: 100, yPos: 210});

    this.setButtonListeners();

    this.jump = this.jump.bind(this);
    this.draw = this.draw.bind(this);
    this.canvas.focus();
    this.enemies = [];
    this.gameOver = false;
  }

  setButtonListeners() {
    this.canvas.addEventListener('keydown', (e) => this.jump(e));
  }

  jump (e) {
    if (e.code === 'Space') {
      e.preventDefault();
      this.player.toggleJump();
    }
  }

  draw () {
    if (!this.gameOver) {
      requestAnimationFrame(this.draw);
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
    }
  }

  start() {
    this.createEnemy();
    this.draw();
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

  const game = new Game(
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
    this.width = 25;
    this.height = 25;
    this.vel = 0;
    this.jumping = false;
    this.doubleJumping = false;
  }

  onGround() {
    return this.yPos >= 210;
  }

  jump() {
    const gravity = 0.2;
    if (this.jumping) {
      if (this.yPos === 210 || !this.onGround()){
        this.vel += gravity;
        this.yPos += this.vel;
      } else {
        this.yPos = 210;
        this.jumping = false;
        this.doubleJumping = false;
      }
    }
  }

  toggleJump() {
    if (!this.jumping) {
      this.jumping = true;
      this.vel = -6;
    } else if (!this.doubleJumping) {
      this.doubleJumping = true;
      this.vel = -6;
    }
  }

  draw (context) {
    context.clearRect(0,0,800,300);
    context.fillStyle = "pink";
    context.fillRect(this.xPos,
      this.yPos, this.width, this.height);
  }

  update (context) {
    this.jump();
    this.draw(context);
    // console.log(this.hitbox())
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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map