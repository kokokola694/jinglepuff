class Pokeball extends Item {
  constructor(props) {
    super(props);

    this.sprites = new Image();
    this.sprites.src = './assets/images/pokeball.png';
    this.points = 500;
  }

  setSprite(context) {
    context.drawImage(this.sprites, 0, 0, 1024, 1024, this.xPos, this.yPos, this.width, this.height);
  }

  render (context) {
    setSprite(context);
    this.xPos -= this.speed;
  }
}
