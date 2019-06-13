export class InputManager {
    constructor(canv) {
        this.canvas = canv;
    }
    onClick(fn) {
        this.canvas.addEventListener('click', ev => {
            const [x,y] = [ev.offsetX, ev.offsetY];
            fn(x,y);
        });
    }
};