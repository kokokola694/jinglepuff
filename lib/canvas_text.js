const levelText = (level) => {
  switch (level) {
    case 1:
      return "Press SPACE to jump! Press twice to double jump!";
    case 2:
      return "Collect PokeBalls for bonus points and powerups!";
    case 3:
      return "WATCH OUT! Meowth is a faster enemy Pokemon!";
    case 4:
      return "Enemies will be faster and harder to avoid!"
  }
}

const CanvasText = (info, context, score, invTimer) => {
  switch (info) {
    case "TRANSITION":
      context.font = "700 50px Aclonica";
      context.fillStyle = "pink";
      context.fillText(`LEVEL ${score.currentLevel}`, 450, 200);
      context.strokeText(`LEVEL ${score.currentLevel}`, 450, 200);
      context.font = "500 30px Aclonica";
      context.fillText(`${levelText(score.currentLevel)}`, 450, 250);
      context.strokeText(`${levelText(score.currentLevel)}`, 450, 250);
      context.textAlign = "center";
      break;
    case "INVINCIBLE":
      context.font = "700 60px Aclonica";
      context.fillStyle = "gold";
      context.fillText(`${invTimer}`, 450, 130);
      context.strokeText(`${invTimer}`, 450, 130);
      context.font = "700 30px Aclonica";
      context.fillText(`INVINCIBLE`, 450, 170);
      context.strokeText(`INVINCIBLE`, 450, 170);
      break;

  }
}

module.exports = CanvasText;
