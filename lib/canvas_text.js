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
  }
}

module.exports = CanvasText;
