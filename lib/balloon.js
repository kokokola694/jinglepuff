class Balloon {
  constructor(props) {
    this.xPos = 700;
    this.yPos = 50;
    this.sprites = new Image();
    this.sprites.src = './assets/images/balloon.png';
    this.frameCount = 0;
  }

  setSprite(context) {
    const frames = 20;
    if (this.frameCount < frames * 1) {
      context.drawImage(this.sprites, 0, 0, 477, 500, this.xPos, this.yPos, 143, 150);
    } else if (this.frameCount < frames * 2) {
      context.drawImage(this.sprites, 0, 0, 477, 500, this.xPos, this.yPos + 1, 143, 150)
    } else if (this.frameCount < frames * 3) {
      context.drawImage(this.sprites, 0, 0, 477, 500, this.xPos, this.yPos + 2, 143, 150)
    } else if (this.frameCount < frames * 4) {
      context.drawImage(this.sprites, 0, 0, 477, 500, this.xPos, this.yPos + 1, 143, 150)
      this.frameCount = 0;
    }
  }

  render(context) {
    this.setSprite(context);
    this.frameCount += 1;
  }
}

module.exports = Balloon;
