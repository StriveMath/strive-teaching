import * as math from "mathjs";
import { tickAxes } from './tickAxes';

window.math = math;


export class Transformer {

  static basisMatrix = math.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

  constructor() {

  }

  static translate(x: number, y: number) {
    const transform = math.matrix(([[1, 0, 0], [0, 1, 0], [x, y, 1]]));
    this.basisMatrix = math.multiply(transform, this.basisMatrix);
    translate(x, y);
    return this.basisMatrix;
  }

  static rotate(angle: number) {
    const transform = math.matrix([[cos(angle), sin(angle), 0], [-sin(angle), cos(angle), 0], [0, 0, 1]]);
    this.basisMatrix = math.multiply(transform, this.basisMatrix);
    rotate(angle);
    return this.basisMatrix;
  }

  static scale(x: number, y: number) {
    const transform = math.matrix(([[x, 0, 0], [0, y, 0], [0, 0, 1]]));
    this.basisMatrix = math.multiply(transform, this.basisMatrix);
    scale(x, y);
    return this.basisMatrix;
  }


  static text(stg: string, x: number, y: number) {
    push();
    let yDir = this.basisMatrix.get([1, 1]);
    if (yDir < 0) {
      scale(1, -1);
      text(stg, x, -y);
    } else {
      text(stg, x, y);
    }
    pop();

  }

  static mouse() {
    const inv = math.inv(this.basisMatrix);
    const tMouseX = mouseX * inv.get([0, 0]) + mouseY * inv.get([1, 0]) + 1 * inv.get([2, 0]);
    const tMouseY = mouseX * inv.get([0, 1]) + mouseY * inv.get([1, 1]) + 1 * inv.get([2, 1]);
    return {
      x: tMouseX,
      y: tMouseY,
    };
  }

  static reset() {
    this.basisMatrix = math.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
  }

  static easyStart() {
    background("black");
    translate(0, height)
    this.scale(1,-1)
    stroke("white")
    fill("white")
    textSize(18)
    tickAxes()
    stroke("green")
    strokeWeight(1)
    let y = height-mouseY
    line(0, y, mouseX, y)
    line(mouseX, 0,mouseX, y)
    noStroke()
    fill("green")
    this.text("(" + Math.floor(mouseX) + "," + Math.floor(y) + ")", mouseX+10, y)

    return this.basisMatrix;
  }
}
