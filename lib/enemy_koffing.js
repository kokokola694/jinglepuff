const Enemy = require('./enemy');

const KOFFING_SPRITES = {"reg1":[0,2,36,36], "reg2":[38,2,36,36],
  "reg3":[76,2,36,36]};

class Koffing extends Enemy {
  constructor(props) {
    super(props);
    this.width = 70;
    this.height = 70;

    this.sprites = new Image();
    this.sprites.src = './assets/images/koffing-sprites.png';
  }

  extractSprite(context, coordinates) {
    context.drawImage (this.sprites, coordinates[0], coordinates[1],
      coordinates[2], coordinates[3], this.xPos, this.yPos, this.width, this.height);
  }

  renderSprite(context) {
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

module.exports = Koffing;
