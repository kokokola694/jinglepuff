const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 900;

class Background {
  constructor(context, src) {
    this.src = src;
    this.speed = 0.6;
    this.xPos = 0;
    this.context = context;
  }

  render () {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.context.drawImage(this.src,3,120,1794,773,
      this.xPos,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    this.context.drawImage(this.src,3,120,1794,773,
      this.xPos + CANVAS_WIDTH,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    if (this.xPos <= -CANVAS_WIDTH) this.xPos = 0;
    this.xPos -= this.speed;
  }
}

module.exports = Background;
