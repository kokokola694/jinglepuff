class Player {
  constructor(props) {
    this.xPos = props.xPos;
    this.yPos = props.yPos;
    this.width = 25;
    this.height = 25;
    this.vel = 0;
    this.jumping = false;
    this.doubleJumping = false;
  }

  jump() {
    const gravity = 0.2;
    if (this.jumping) {
      if (this.yPos === 290 || this.yPos < 290) {
        this.vel += gravity;
        this.yPos += this.vel;
      } else {
        this.yPos = 290;
        this.jumping = false;
        this.doubleJumping = false;
      }
    }
  }

  setJumpVel() {
    if (!this.jumping) {
      this.jumping = true;
      this.vel = -6;
    } else if (!this.doubleJumping) {
      this.doubleJumping = true;
      this.vel = -6;
    }
  }

  render (context) {
    context.clearRect(0,0,900,400);
    context.fillStyle = "pink";
    context.fillRect(this.xPos,
      this.yPos, this.width, this.height);
  }

  update (context) {
    this.jump();
    this.render(context);
  }

  collided (object) {
    return !(
      this.hitbox().maxX < object.hitbox().minX ||
      this.hitbox().minX > object.hitbox().maxX ||
      this.hitbox().maxY < object.hitbox().minY ||
      this.hitbox().minY > object.hitbox().maxY
    );
  }

  hitbox() {
    return {
      minX: this.xPos,
      maxX: this.xPos + this.width,
      minY: this.yPos,
      maxY: this.yPos + this.height,
    };
  }
}

module.exports = Player;
