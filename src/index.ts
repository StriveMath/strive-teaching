import MovableCircle from "./lib/movableCircle" 

class Strive {
    public static createMovableCircle(x:number, y:number, d:number) {
        return new MovableCircle(x,y,d);
    }
}

//@ts-ignore
window.Strive = Strive;