const Enemy = require('./enemy');

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
