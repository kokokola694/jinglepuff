const GRAVITY = 0.25;
const GROUND_YPOS = 290;
const SPRITES = {"fall": [125,6,26,26], "jump":[160,5,26,26],
  "walk1":[281,5,26,26], "walk2": [252,5,26,26], "walk3": [223,5,26,26],
  "walk4":[195,5,26,26]};

class Player {
  constructor(props) {
    this.xPos = props.xPos;
    this.yPos = props.yPos;
    this.width = 50;
    this.height = 50;
    this.vel = 0;
    this.jumping = false;
    this.doubleJumping = false;
    this.invincible = false;
    this.jumpFX = new Audio('./assets/audio/jump_02.wav');
    this.doubleJumpFX = new Audio('./assets/audio/jump_02.wav');
    this.sprites = new Image();
    this.sprites.src = './assets/images/jigglypuff-sprites.png';
    this.frameCount = 0;
  }

  renderJump() {
    if (this.jumping) {
      if (this.yPos <= GROUND_YPOS) {
        this.vel += GRAVITY;
        this.yPos += this.vel;
      } else {
        this.yPos = GROUND_YPOS;
        this.vel = 0;
        this.jumping = false;
        this.doubleJumping = false;
      }
    }
  }

  setJumpVel() {
    if (!this.jumping) {
      this.jumping = true;
      this.vel = -7;
      this.jumpFX.play();
    } else if (!this.doubleJumping) {
      this.doubleJumping = true;
      this.vel = -6.8;
      this.doubleJumpFX.play();
    }
  }

  extractSprite(context, coordinates) {
    context.drawImage(this.sprites, coordinates[0], coordinates[1],
      coordinates[2], coordinates[3], this.xPos, this.yPos,
      this.width, this.height);
  }

  renderSprite(context) {
    const frames = 9;
    if (this.vel > 0) {
      this.extractSprite(context, SPRITES["fall"]);
      this.frameCount = 0;
    } else if (this.jumping) {
      this.extractSprite(context, SPRITES["jump"]);
      this.frameCount = 0;

    } else if (this.frameCount < frames*1) {
      this.extractSprite(context, SPRITES["walk1"]);
    } else if (this.frameCount < frames*2) {
      this.extractSprite(context, SPRITES["walk2"]);
    } else if (this.frameCount < frames*3) {
      this.extractSprite(context, SPRITES["walk3"]);
    } else if (this.frameCount < frames*4) {
      this.extractSprite(context, SPRITES["walk4"]);
    } else if (this.frameCount < frames*5) {
      this.extractSprite(context, SPRITES["walk3"]);
    } else if (this.frameCount < frames*6) {
      this.extractSprite(context, SPRITES["walk2"]);
      this.frameCount = 0;
    }
  }

  render (context) {
    context.clearRect(0,0,900,400);
    this.renderSprite(context);
    this.renderJump();
    this.frameCount += 1;
  }

  collided (object) {
    const playerCenterX = this.xPos + this.width/2;
    const playerCenterY = this.yPos + this.height/2;
    const objectCenterX = object.xPos + object.width/2;
    const objectCenterY = object.yPos + object.height/2;

    const dx = playerCenterX - objectCenterX;
    const dy = playerCenterY - objectCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (this.width-8)/2 + (object.width-8)/2;
  }
}

module.exports = Player;
