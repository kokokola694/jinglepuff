class Player {
  constructor(props) {
    this.xPos = props.xPos;
    this.yPos = props.yPos;
    this.width = 25;
    this.height = 25;
    this.vel = 0;
    this.speed = 3;
    this.jumping = false;
    this.jumpCount = 0;
  }

  onGround() {
    return this.yPos >= 210;
  }

  jump() {
    const gravity = 0.2;
    if (this.jumping) {
      if (this.yPos === 210 || !this.onGround()){
        this.vel += gravity;
        this.yPos += this.vel;
      } else {
        this.yPos = 210;
        this.jumping = false;
      }
    }
  }

  toggleJump() {
    if (!this.jumping) {
      this.jumping = true;
      this.vel = -this.speed*2;
    }
  }

  draw (context) {
    context.clearRect(0,0,900,400);
    context.fillStyle = "pink";
    context.fillRect(this.xPos,
      this.yPos, this.width, this.height);
  }

  update (context) {
    this.jump();
    this.draw(context);
  }
}

module.exports = Player;
