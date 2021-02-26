import {Transformer} from "./transformer";

let anyMoving = false;

class MovableCircle {
    public x: number;
    public y: number;
    public d: number;
    private isMovable: boolean;

    constructor(x: number, y: number, d: number) {
        this.x = x;
        this.y = y;
        this.d = d;
        this.isMovable = false;
        //@ts-ignore
        _renderer.elt.addEventListener("mouseup", this.mouseReleased);
    }

    public draw() {
        push();
        if (this.isMouseHovering() || this.isMovable) {
            fill("red");
        }
        if (this.isMovable) {
            this.x = Transformer.mouse().x;
            this.y = Transformer.mouse().y;
        }
        circle(this.x, this.y, this.d);
        this.makeMovable();
        pop();
    }

    private isMouseHovering() {
        return dist(Transformer.mouse().x, Transformer.mouse().y, this.x, this.y) < this.d / 2;
    }

    private makeMovable() {
        if (this.isMouseHovering() && !anyMoving) {
            if (mouseIsPressed) {
                anyMoving = true;
                this.isMovable = true;
            }
        }
    }

    private mouseReleased = () => {
        anyMoving = false;
        this.isMovable = false;
    };
}


export default MovableCircle;
