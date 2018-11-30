const Enemy = require('./enemy');

class Arbok extends Enemy {
  constructor(props) {
    super(props);
    this.stings = [];
    this.sprites = new Image();
    this.sprites.src = './assets/images/arbok-sprites.png';
  }

  setSprite (context) {

  }

  render(context) {
    this.setSprite(context);
    if (!shooting) {
      this.xPos -= this.speed;
    } else {
      if (this.renderCount === 200) {
        this.createSting(context);
      }
      this.renderSting(context);
    }
    this.renderCount += 1;
  }


  shooting() {
    return this.xPos < 800;
  }

  createSting () {
    return {xPos: 800, yPos: 250, width: 30, height: 10};
  }

  renderSting(context) {

  }
}
