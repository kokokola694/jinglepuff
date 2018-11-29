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
