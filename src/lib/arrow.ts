export function arrow(
    tailX:number, tailY:number, 
    headX:number, headY:number
) {

    let x:number = headX - tailX;
    let y:number = headY - tailY;
  
    push();

    translate(tailX, tailY);
    line(0, 0, x, y);
  
    if (x >= 0) {
      rotate(atan(y / x));
    } else {
      rotate(PI + atan(y / x));
    }
  
    let arrowSize = 7;
    translate(dist(0, 0, x, y) - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);

    pop();
}