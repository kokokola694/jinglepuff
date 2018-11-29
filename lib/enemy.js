class Enemy {
  constructor(props) {
    this.xPos = 950;
    this.yPos = 250;
    this.width = 70;
    this.height = 70;
    this.speed = 5;
    this.sprites = new Image();
    this.sprites.src = './assets/images/koffing-sprites.png';
  }

  render(context) {
    context.drawImage(
      this.sprites,0,0,38,38,this.xPos,this.yPos,this.width,this.height
    );
  }

  update(context) {
    this.render(context);
    this.xPos -= this.speed;
  }

  hitbox() {
    return {
      minX: this.xPos, maxX: this.xPos + this.width,
      minY: this.yPos, maxY: this.yPos + this.height,
    };
  }
}

module.exports = Enemy;
