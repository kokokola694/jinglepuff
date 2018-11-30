const Enemy = require('./enemy');

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
