const levelText = (level) => {
  switch (level) {
    case 1:
      return "Tip: Press SPACE to jump!";
    case 2:
      return "Tip: Press SPACE twice to double-jump!";
    case 3:
      return "Tip: Time your jumps carefully...";
  }
}

const CanvasText = (info, context, score) => {
  switch (info) {
    case "GAME_OVER":
      context.font = "700 60px Aclonica";
      context.fillStyle = "pink";
      context.fillText(`GAME OVER`, 625, 100);
      context.strokeText(`GAME OVER`, 625, 100);
      context.font = "700 24px Aclonica";
      context.fillStyle = "pink";
      context.fillText(`Press R to try again!`, 550, 150);
      context.strokeText(`Press R to try again!`, 550, 150);
      break;
    case "TRANSITION":
      context.font = "700 50px Aclonica";
      context.fillStyle = "pink";
      context.fillText(`LEVEL ${score.currentLevel}`, 450, 200);
      context.strokeText(`LEVEL ${score.currentLevel}`, 450, 200);
      context.font = "500 25px Aclonica";
      context.fillText(`${levelText(score.currentLevel)}`, 450, 250);
      context.strokeText(`${levelText(score.currentLevel)}`, 450, 250);
      context.textAlign = "center";
      break;
    case "PAUSE":
      context.font = "700 60px Aclonica";
      context.fillStyle = "pink";
      context.fillText(`PAUSED`, 575, 200);
      context.strokeText(`PAUSED`, 575, 200);
      context.font = "700 24px Aclonica";
      context.fillStyle = "pink";
      context.fillText(`Press P to resume.`, 550, 250);
      context.strokeText(`Press P to resume.`, 550, 250);
      break;
  }
}

module.exports = CanvasText;
