class Score {
  constructor (props) {
    this.currentScore = 0;
    this.currentLevel = 1;
  }

  render (context) {
    context.font = "26px Arial";
    context.fillStyle = "white";
    context.fillText("Score: " + this.currentScore, 850, 35);
    context.textAlign = "end";
    context.fillText("Level: " + this.currentLevel, 150, 35);
    this.currentScore += 3;
    if (this.currentScore === 1500) {
      this.currentLevel = 2;
    }
  }
}

module.exports = Score;
