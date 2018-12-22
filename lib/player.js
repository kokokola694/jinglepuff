const GRAVITY = 0.25;
const GROUND_YPOS = 290;
const SPRITES = {"fall": [125,6,26,26], "jump":[160,5,26,26],
  "walk1":[281,5,26,26], "walk2": [252,5,26,26], "walk3": [223,5,26,26],
  "walk4":[195,5,26,26]};

const PARTICLES = {"frame1": [2, 2, 40, 40], "frame2":[51, 2, 46, 46],
  "frame3": [149, 2, 46, 46], "frame4": [198, 2, 46, 46], "frame5": [394, 2, 46, 46],
  "frame6": [2, 52, 46, 46], "frame7": [149, 52, 46, 46], "frame8": [2, 100, 46, 46],
  "frame9": [100, 100, 46, 46], "frame10": [296, 100, 46, 46], "frame11":[2, 149, 46, 46],
  "frame12": [100, 148, 46, 46]}

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
    this.particles = new Image();
    this.particles.src = './assets/images/invincible_particle.png';
    this.frameCount = 0;
    this.particleFrameCount = 0;
    this.heldItems = [];
  }

  removeInv() {
    this.invincible = false;
    this.heldItems = [];
    this.width = 50;
    this.height = 50;
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
      this.vel = -8;
      this.jumpFX.play();
    } else if (!this.doubleJumping) {
      this.doubleJumping = true;
      this.vel = -6.8;
      this.doubleJumpFX.play();
    }
  }

  extractSprite(context, coordinates, sprites, extraSize = 0) {
    context.drawImage(sprites, coordinates[0], coordinates[1],
      coordinates[2], coordinates[3], this.xPos - extraSize/2, this.yPos - extraSize/2,
      this.width + extraSize, this.height + extraSize);
  }

  renderInvincible(context) {
    const frames = 5;
    if (this.particleFrameCount < frames*1) {
      this.extractSprite(context, PARTICLES["frame1"], this.particles, 40);
    } else if (this.particleFrameCount < frames*2) {
      this.extractSprite(context, PARTICLES["frame2"], this.particles, 40);
    } else if (this.particleFrameCount < frames*3) {
      this.extractSprite(context, PARTICLES["frame3"], this.particles, 40);
    } else if (this.particleFrameCount < frames*4) {
      this.extractSprite(context, PARTICLES["frame4"], this.particles, 40);
    } else if (this.particleFrameCount < frames*5) {
      this.extractSprite(context, PARTICLES["frame5"], this.particles, 40);
    } else if (this.particleFrameCount < frames*6) {
      this.extractSprite(context, PARTICLES["frame6"], this.particles, 40);
    } else if (this.particleFrameCount < frames*7) {
      this.extractSprite(context, PARTICLES["frame7"], this.particles, 40);
    } else if (this.particleFrameCount < frames*8) {
      this.extractSprite(context, PARTICLES["frame8"], this.particles, 40);
    } else if (this.particleFrameCount < frames*9) {
      this.extractSprite(context, PARTICLES["frame9"], this.particles, 40);
    } else if (this.particleFrameCount < frames*10) {
      this.extractSprite(context, PARTICLES["frame10"], this.particles, 40);
    } else if (this.particleFrameCount < frames*11) {
      this.extractSprite(context, PARTICLES["frame11"], this.particles, 40);
    } else {
      this.extractSprite(context, PARTICLES["frame12"], this.particles, 40);
      this.particleFrameCount = 0;
    }
  }

  renderSprite(context) {
    const frames = 9;
    if (this.vel > 0) {
      this.extractSprite(context, SPRITES["fall"], this.sprites);
      this.frameCount = 0;
    } else if (this.jumping) {
      this.extractSprite(context, SPRITES["jump"], this.sprites);
      this.frameCount = 0;

    } else if (this.frameCount < frames*1) {
      this.extractSprite(context, SPRITES["walk1"], this.sprites);
    } else if (this.frameCount < frames*2) {
      this.extractSprite(context, SPRITES["walk2"], this.sprites);
    } else if (this.frameCount < frames*3) {
      this.extractSprite(context, SPRITES["walk3"], this.sprites);
    } else if (this.frameCount < frames*4) {
      this.extractSprite(context, SPRITES["walk4"], this.sprites);
    } else if (this.frameCount < frames*5) {
      this.extractSprite(context, SPRITES["walk3"], this.sprites);
    } else if (this.frameCount < frames*6) {
      this.extractSprite(context, SPRITES["walk2"], this.sprites);
      this.frameCount = 0;
    }
  }

  render (context) {
    context.clearRect(0,0,900,400);
    this.renderSprite(context);
    if (this.invincible) this.renderInvincible(context);
    this.renderJump();
    this.frameCount += 1;
    this.particleFrameCount += 1;
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
