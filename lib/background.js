const CANVAS_HEIGHT = 400;
const CANVAS_WIDTH = 900;

const FAR_BG = {
  speed: 0.6,
  src: './assets/images/winter1.png',
  imgCoord: [3,120,1794,773],
  canvasCoord1: [null, 0, CANVAS_WIDTH, CANVAS_HEIGHT],
  canvasCoord2: [null, 0, CANVAS_WIDTH, CANVAS_HEIGHT]
}

const NEAR_BG = {
  speed: 3,
  src: './assets/images/snow_houses.png',
  imgCoord: [15,0,1170,800],
  canvasCoord1: [null, -100, CANVAS_WIDTH, CANVAS_HEIGHT + 100],
  canvasCoord2: [null, -100, CANVAS_WIDTH, CANVAS_HEIGHT + 100]
}

class Background {
  constructor(context, description) {
    this.options = description === "far" ? FAR_BG : NEAR_BG;
    this.speed = this.options["speed"];
    this.xPos = 0;
    this.context = context;

    this.img = new Image();
    this.img.src = this.options["src"];
    this.draw = this.draw.bind(this);
  }

  draw() {
    this.context.drawImage (
      this.img,
      this.options["imgCoord"][0],
      this.options["imgCoord"][1],
      this.options["imgCoord"][2],
      this.options["imgCoord"][3],
      this.options["canvasCoord1"][0],
      this.options["canvasCoord1"][1],
      this.options["canvasCoord1"][2],
      this.options["canvasCoord1"][3]
    );
    this.context.drawImage (
      this.img,
      this.options["imgCoord"][0],
      this.options["imgCoord"][1],
      this.options["imgCoord"][2],
      this.options["imgCoord"][3],
      this.options["canvasCoord2"][0],
      this.options["canvasCoord2"][1],
      this.options["canvasCoord2"][2],
      this.options["canvasCoord2"][3]
    );
  }

  render () {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.options["canvasCoord1"][0] = this.xPos;
    this.options["canvasCoord2"][0] = this.xPos + CANVAS_WIDTH;
    this.draw();
    if (this.xPos <= -CANVAS_WIDTH) this.xPos = 0;
    this.xPos -= this.speed;
  }
}

module.exports = Background;
