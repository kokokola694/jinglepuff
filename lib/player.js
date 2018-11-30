class Player {
  constructor(props) {
    this.xPos = props.xPos;
    this.yPos = props.yPos;
    this.width = 50;
    this.height = 50;
    this.vel = 0;
    this.jumping = false;
    this.doubleJumping = false;
    this.invincible = true;
    this.jumpFX = new Audio('./assets/audio/jump_02.wav');
    this.sprites = new Image();
    this.sprites.src = './assets/images/jigglypuff-sprites.png';
    this.renderCount = 0;
  }

  jump() {
    const gravity = 0.2;
    if (this.jumping) {
      if (this.yPos === 290 || this.yPos < 290) {
        this.vel += gravity;
        this.yPos += this.vel;
      } else {
        this.yPos = 290;
        this.vel = 0;
        this.jumping = false;
        this.doubleJumping = false;
      }
    }
  }

  setJumpVel() {
    if (!this.jumping) {
      this.jumping = true;
      this.vel = -6.5;
      this.jumpFX.play();
    } else if (!this.doubleJumping) {
      this.doubleJumping = true;
      this.vel = -6.5;
      this.jumpFX.play();
    }
  }

  setSprite(context) {
    const frames = 9;
    if (this.vel > 0) {
      context.drawImage (
        this.sprites,125,6,26,26,this.xPos,this.yPos,this.width,this.height
      );
      this.renderCount = 0;
    } else if (this.jumping) {
      context.drawImage (
        this.sprites,160,5,26,26,this.xPos,this.yPos,this.width,this.height
      );
      this.renderCount = 0;
    } else if (this.renderCount < frames*1) {
      context.drawImage (
        this.sprites,281,5,26,26,this.xPos,this.yPos,this.width,this.height
      );
    } else if (this.renderCount < frames*2) {
      context.drawImage (
        this.sprites,252,5,26,26,this.xPos,this.yPos,this.width,this.height
      );
    } else if (this.renderCount < frames*3) {
      context.drawImage (
        this.sprites,223,5,26,26,this.xPos,this.yPos,this.width,this.height
      );
    } else if (this.renderCount < frames*4) {
      context.drawImage (
        this.sprites,195,5,26,26,this.xPos,this.yPos,this.width,this.height
      );
    } else if (this.renderCount < frames*5) {
      context.drawImage (
        this.sprites,252,5,26,26,this.xPos,this.yPos,this.width,this.height
      );
    } else if (this.renderCount < frames*6) {
      context.drawImage (
        this.sprites,223,5,26,26,this.xPos,this.yPos,this.width,this.height
      );
      this.renderCount = 0;
    }
  }

  render (context) {
    context.clearRect(0,0,900,400);
    this.setSprite(context);
    this.jump();
    this.renderCount += 1;
  }

  collided (object) {
    const playerCenterX = this.xPos + this.width/2;
    const playerCenterY = this.yPos + this.height/2;
    const objectCenterX = object.xPos + object.width/2;
    const objectCenterY = object.yPos + object.height/2;
    const dx = playerCenterX - objectCenterX;
    const dy = playerCenterY - objectCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    return dist < (this.width-8)/2 + (object.width-8)/2;
    // return !(
    //   this.hitbox().maxX < object.hitbox().minX ||
    //   this.hitbox().minX > object.hitbox().maxX ||
    //   this.hitbox().maxY < object.hitbox().minY ||
    //   this.hitbox().minY > object.hitbox().maxY
    // );
  }

  // hitbox() {
  //   return {
  //     minX: this.xPos,
  //     maxX: this.xPos + this.width,
  //     minY: this.yPos,
  //     maxY: this.yPos + this.height,
  //   };
  // }
}

module.exports = Player;
