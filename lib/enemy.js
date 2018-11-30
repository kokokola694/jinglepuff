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
