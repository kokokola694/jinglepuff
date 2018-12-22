class Score {
  constructor (props) {
    this.currentScore = 0;
    this.frameCount = 0;
    this.currentLevel = 1;
    this.plusPointTimer = 0;
    document.getElementById('score-pickup').classList.add('hidden');

  }

  display(context) {
    context.textAlign = "center";
    context.font = "24px Aclonica";
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.fillText("SCORE", 250, 35);
    context.strokeText("SCORE", 250, 35);
    context.fillText(this.currentScore, 250, 75);
    context.strokeText(this.currentScore, 250, 75);
    context.fillText("LEVEL " + this.currentLevel, 100, 35);
    context.strokeText("LEVEL " + this.currentLevel, 100, 35);

  }

  addPointsDisp () {
    this.plusTimer = 100;
    document.getElementById('score-pickup').classList.remove('hidden');
  }

  render (context) {
    this.display(context);
    this.update();
    this.levelcheck();
  }

  update() {
    this.currentScore += 3;
    this.frameCount += 1;
    if (this.plusTimer > 0) this.plusTimer -= 1;
    if (this.plusTimer === 1) {
      document.getElementById('score-pickup').classList.add('hidden');
    }
  }

  levelcheck () {
    if (this.frameCount === 400) {
      this.currentLevel = 2;
    } else if (this.frameCount === 1500) {
      this.currentLevel = 3;
    } else if (this.frameCount === 2500) {
      this.currentLevel = 4;
    }
  }
}

module.exports = Score;
