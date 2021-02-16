let anyMoving = false;

class MovableCircle {
  x: number;
  y: number;
  d: number;
  isMovable: boolean;
  constructor(x: number, y: number, d: number) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.isMovable = false;
    //@ts-ignore
    _renderer.elt.addEventListener("mouseup", this.mouseReleased);
  }

  draw() {
    push();
    if (this.isMouseHovering() || this.isMovable) {
      fill(255);
    } else {
      fill(0);
    }
    if (this.isMovable) {
      this.x += mouseX - pmouseX;
      this.y += mouseY - pmouseY;
    }
    circle(this.x, this.y, this.d);
    this.makeMovable();
    pop();
  }

  isMouseHovering() {
    return dist(mouseX, mouseY, this.x, this.y) < this.d / 2;
  }

  makeMovable() {
    if (this.isMouseHovering() && !anyMoving) {
      if (mouseIsPressed) {
        anyMoving = true;
        this.isMovable = true;
      }
    }
  }

  mouseReleased = () => {
    anyMoving = false;
    this.isMovable = false;
  };
}


export default MovableCircle;
