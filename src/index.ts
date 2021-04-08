import p5 from "p5";
import MovableCircle from "./lib/movableCircle";
import { tickAxes } from "./lib/tickAxes";
import { Transformer } from "./lib/transformer";


export class Strive {
  static createMovableCircle(x: number, y: number, d: number) {
    return new MovableCircle(x, y, d);
  }

  static drawTickAxes() {
    tickAxes();
  }

  static translate(x: number, y: number) {
    Transformer.translate(x, y);
  }

  static scale(x: number, y: number) {
    Transformer.scale(x, y);
  }

  static rotate(angle: number) {
    Transformer.rotate(angle);
  }

  static mouse() {
    return Transformer.mouse();
  }

  static reset() {
    return Transformer.reset();
  }
}
window.p5 = p5;

//@ts-ignore
window.Strive = Strive;

// @ts-ignore
window.p5.prototype.registerMethod("post", () => {
  Strive.reset();
});
