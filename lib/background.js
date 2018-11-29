class Background {
  constructor(context, src) {
    this.src = src;
    this.speed = 0.5;
    this.xPos = 0;
    this.context = context;
  }

  render () {
    const canvWidth = 900;
    const canvHeight = 400;
    this.context.clearRect(0, 0, canvWidth, canvHeight);
    this.context.drawImage(this.src,0,350,1200,450,this.xPos,0,canvWidth,canvHeight);
    this.context.drawImage(this.src,0,350,1200,450,this.xPos + canvWidth,0,canvWidth,canvHeight);
    if (this.xPos <= -canvWidth) {
      this.xPos = 0;
    }
    this.xPos -= this.speed;
  }
}

module.exports = Background;
