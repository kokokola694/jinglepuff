class Score {
  constructor (props) {
    this.currentScore = 0;
    this.frameCount = 0;
    this.currentLevel = 1;
  }

  render (context) {
    context.font = "700 26px Arial";
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.fillText("Score: " + this.currentScore, 850, 35);
    context.strokeText("Score: " + this.currentScore, 850, 35);
    context.textAlign = "end";
    context.fillText("Level: " + this.currentLevel, 150, 35);
    context.strokeText("Level: " + this.currentLevel, 150, 35);

    this.update();
    this.levelcheck();
  }

  update() {
    this.currentScore += 3;
    this.frameCount += 1;
  }

  levelcheck () {
    if (this.frameCount === 500) {
      this.currentLevel = 2;
    } else if (this.frameCount === 1000) {
      this.currentLevel = 3;
    }
  }
}

module.exports = Score;
