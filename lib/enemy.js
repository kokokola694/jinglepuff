class Enemy {
  constructor(props) {
    this.xPos = props.xPos;
    this.yPos = props.yPos;
    this.speed = props.speed;
    this.width = 50;
    this.height = 50;
    this.frameCount = 0;
  }

  renderSprite(context) {
    context.fillStyle = "blue";
    context.fillRect(this.xPos,
      this.yPos, this.width, this.height);
  }

  render(context) {
    this.renderSprite(context);
    this.xPos -= this.speed;
    this.frameCount += 1;
  }
}

module.exports = Enemy;
