import { Strive } from "./index";


// @ts-ignore
window.setup = () => {
  createCanvas(800, 800);
};
// @ts-ignore
window.draw = () => {
  background("black");
  stroke("white")
  Strive.drawArrow(100,100,200,200)
  Strive.drawTickAxes();
};
