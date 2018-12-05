class Item {
  constructor (props) {
    this.xPos = props.xPos;
    this.yPos = props.yPos;
    this.width = 50;
    this.height = 50;
    this.speed = 3;
  }

  setSprite(context) {
    context.fillStyle = "green";
    context.fillRect(this.xPos,
      this.yPos, this.width, this.height);
  }

  render(context) {
    this.setSprite(context);
    this.xPos -= this.speed;
  }
}

module.exports = Item;
