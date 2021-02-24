import math from "mathjs";
import MovableCircle from "./lib/movableCircle";
import {Transformer} from "./lib/transformer";

window.math = math;

class Strive {
    static transformer = new Transformer();

    public static createMovableCircle(x: number, y: number, d: number) {
        return new MovableCircle(x, y, d);
    }

    public static drawTickAxes = (lineColor = "rgb(20,45,217)", thickness = 3, spacing = 50, xoffset = 0, yoffset = 0, flip = false) => {
        push();
        translate(xoffset, yoffset);
        for (let i = 0; i < height; i += spacing) {

            //vertical tickmarks
            stroke(lineColor);
            strokeWeight(thickness);
            line(5, i, -5, i);
            line(5, -i, -5, -i);

            //horizontal tickmarks
            line(i, +5, i, -5);
            line(-i, +5, -i, -5);

            fill("white");
            noStroke();
            if (flip) {
                scale(1, -1);
            }
            text(i, 16, i);
            text(-i, 16, -i);

            text(i, i, 16);
            text(-i, -i, 16);
            if (flip) {
                scale(1, -1);
            }

            strokeWeight(0.25);
            stroke(color("rgba(255,255,255,0.6)"));
            line(i, -height, i, height);
            line(-i, -height, -i, height);

            line(-width, i, width, i);
            line(-width, -i, width, -i);


        }
        stroke(lineColor);
        strokeWeight(5);
//horizontal line
        line(-width, 0, width, 0);
//vertical line
        line(0, height, 0, -height);

        pop();
    };

    public static translate(x: number, y: number) {
        this.transformer.translate(x, y);
    }
}

//@ts-ignore
window.Strive = Strive;
