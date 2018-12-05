const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 900;

class Ground {
  constructor(context, src) {
    this.src = src;
    this.speed = 3;
    this.xPos = 0;
    this.context = context;
  }

  render () {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.context.drawImage(this.src,15,0,1170,800,
      this.xPos,-100,CANVAS_WIDTH,CANVAS_HEIGHT+100);
    this.context.drawImage(this.src,15,0,1170,800,
      this.xPos + CANVAS_WIDTH,-100,CANVAS_WIDTH,CANVAS_HEIGHT+100);
    if (this.xPos <= -CANVAS_WIDTH) this.xPos = 0;
    this.xPos -= this.speed;
  }
}

module.exports = Ground;
