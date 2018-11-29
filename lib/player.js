class Player {
  constructor(props) {
    this.xPos = props.xPos;
    this.yPos = props.yPos;
    this.width = 15;
    this.height = 15;
    this.vel = 0;
    this.jumping = false;
  }

  jump () {
    const gravity = 0.25;
    const speed = 3;
    if (!this.jumping) {
     this.jumping = true;
     this.vel = -speed*2 - gravity;
     this.yPos += this.vel;
    }
    if (this.yPos >= 400 - this.height){
        this.yPos = 400 - this.height;
        this.jumping = false;
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
