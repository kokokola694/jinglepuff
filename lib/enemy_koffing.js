const Enemy = require('./enemy');

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
