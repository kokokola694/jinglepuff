class Enemy {
  constructor(props) {
    this.xPos = 950;
    this.yPos = 250;
    this.width = 70;
    this.height = 70;
    this.speed = 5;
    this.renderCount = 0;
  }

  setSprite(context) {
    context.fillStyle = "blue";
    context.fillRect(this.xPos,
      this.yPos, this.width, this.height);
  }

  render(context) {
    this.setSprite(context);
    this.xPos -= this.speed;
    this.renderCount += 1;
  }

  // hitbox() {
  //   return {
  //     minX: this.xPos, maxX: this.xPos + this.width,
  //     minY: this.yPos, maxY: this.yPos + this.height,
  //   };
  // }
}

module.exports = Enemy;
