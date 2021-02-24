import math from "mathjs";


export class Transformer {

    basisMatrix: any;

    constructor() {
        this.basisMatrix = math.matrix([[1, 0], [0, 1]]);
    }

    translate(x: number, y: number) {
    }
}
