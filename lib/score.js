class Score {
  constructor (props) {
    this.currentScore = 0;
  }

  render (context) {
    context.font = "26px Arial";
    context.fillStyle = "white";
    context.fillText("Score: " + this.currentScore, 850, 35);
    context.textAlign = "end";
    this.currentScore += 3;
  }
}

module.exports = Score;
