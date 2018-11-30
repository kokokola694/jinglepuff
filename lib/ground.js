class Ground {
  constructor(context, src) {
    this.src = src;
    this.speed = 2;
    this.xPos = 0;
    this.context = context;
  }

  render () {
    const canvWidth = 900;
    const canvHeight = 400;
    this.context.clearRect(0, 0, canvWidth, canvHeight);
    this.context.drawImage(this.src,15,0,1170,800,this.xPos,-100,canvWidth,canvHeight+100);
    this.context.drawImage(this.src,15,0,1170,800,this.xPos + canvWidth,-100,canvWidth,canvHeight+100);
    if (this.xPos <= -canvWidth) {
      this.xPos = 0;
    }
    this.xPos -= this.speed;
  }
}

module.exports = Ground;
