const Enemy = require('./enemy');

class Meowth extends Enemy {
  constructor(props) {
    super(props);
    this.xPos = 950;
    this.yPos = 280;
    this.width = 50;
    this.height = 50;
    this.speed = 3;
    this.attackPos = 650 + Math.floor(Math.random()*20);

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
      this.speed = 25;
    } else {
      this.speed = 3;
    }
    this.xPos -= this.speed;
    this.renderCount += 1;
  }

}

module.exports = Meowth;
