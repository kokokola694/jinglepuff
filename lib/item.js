class Item {
  constructor (props) {
    this.xPos = props.xPos;
    this.yPos = props.yPos;
    this.width = 30;
    this.height = 30;
    this.speed = 3;
  }

  render(context) {
    context.fillStyle = "green";
    context.fillRect(this.xPos,
      this.yPos, this.width, this.height);
    this.xPos -= this.speed;
    console.log('item here')
  }


}

module.exports = Item;
