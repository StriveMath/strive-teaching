import * as math from "mathjs";

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

    static mouse() {
        const inv = math.inv(this.basisMatrix);
        const tMouseX = mouseX * inv.get([0, 0]) + mouseY * inv.get([1, 0]) + 1 * inv.get([2, 0]);
        const tMouseY = mouseX * inv.get([0, 1]) + mouseY * inv.get([1, 1]) + 1 * inv.get([2, 1]);
        return {
            x: tMouseX,
            y: tMouseY
        };
    }

    static reset() {
        this.basisMatrix = math.matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    }
}
