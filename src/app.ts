import { Strive } from "./index";


// @ts-ignore
window.setup = () => {
  createCanvas(800, 800);
};
// @ts-ignore
window.draw = () => {
  background("black");
  Strive.rotate(100);
  Strive.translate(100,100)
  Strive.drawTickAxes();
};
