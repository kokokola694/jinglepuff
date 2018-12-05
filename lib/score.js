class Score {
  constructor (props) {
    this.currentScore = 0;
    this.frameCount = 0;
    this.currentLevel = 1;
  }

  display(context) {
    context.font = "24px Aclonica";
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.fillText("Score: " + this.currentScore, 850, 35);
    context.strokeText("Score: " + this.currentScore, 850, 35);
    context.textAlign = "end";
    context.fillText("LEVEL " + this.currentLevel, 150, 35);
    context.strokeText("LEVEL " + this.currentLevel, 150, 35);
  }

  render (context) {
    this.display(context);
    this.update();
    this.levelcheck();
  }

  update() {
    this.currentScore += 3;
    this.frameCount += 1;
  }

  levelcheck () {
    if (this.frameCount === 700) {
      this.currentLevel = 2;
    } else if (this.frameCount === 1500) {
      this.currentLevel = 3;
    }
  }
}

module.exports = Score;
