import { Transformer } from './transformer'
import { tickAxes } from './tickAxes'

export class Utils {
    
    constructor() {

    }

    static easyStart() {
        background("black");
        Transformer.translate(0, height)
        Transformer.scale(1,-1)
        stroke("white")
        fill("white")
        textSize(18)
        tickAxes()
        stroke("green")
        strokeWeight(1)
        let x = Transformer.mouse().x
        let y = Transformer.mouse().y
        line(0, y, x, y)
        line(x, 0, x, y)
        noStroke()
        fill("green")
        Transformer.text("(" + Math.floor(x) + "," + Math.floor(y) + ")", x+10, y)
    }
}