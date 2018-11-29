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

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(/*! ./player */ "./lib/player.js");

class Game {
  constructor (canvas, canvasContext) {
    this.canvas = canvas;
    this.context = canvasContext;

    this.player = new Player({xPos: 100, yPos: 210});

    this.setButtonListeners();


    this.jump = this.jump.bind(this);
    this.draw = this.draw.bind(this);
    this.canvas.focus();
  }

  setButtonListeners() {
    this.canvas.addEventListener('keydown', (e) => this.jump(e));
  }

  jump (event) {
    if (event.code === 'Space') {
      event.preventDefault();
      this.player.toggleJump();
    }
  }

  draw () {
    this.player.update(this.context);
    this.context.beginPath();
    this.context.moveTo(0,210);
    this.context.lineTo(800,210);
    this.context.stroke();
    requestAnimationFrame(this.draw);
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
  game.draw();

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
    this.speed = 3;
    this.jumping = false;
    this.jumpCount = 0;
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
      }
    }
  }

  toggleJump() {
    if (!this.jumping) {
      this.jumping = true;
      this.vel = -this.speed*2;
    }
  }

  draw (context) {
    context.clearRect(0,0,900,400);
    context.fillStyle = "pink";
    context.fillRect(this.xPos,
      this.yPos, this.width, this.height);
  }

  update (context) {
    this.jump();
    this.draw(context);
  }
}

module.exports = Player;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map