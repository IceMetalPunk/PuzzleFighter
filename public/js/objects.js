import * as Renderers from './renderers.js'

class ObjectEntity {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    setBbox(left, top, right, bottom) {
        this.bbox = {
            left, top, right, bottom
        };
    }
    getBbox() {
        return this.bbox;
    }
    draw(canv, ctx) {
        if (this.renderer) {
            this.renderer.draw(canv, ctx, this.x, this.y);
        }
    }
    isAtPos(x,y) {
        return x >= this.x + this.bbox.left && x <= this.x + this.bbox.right &&
               y >= this.y + this.bbox.top && y <= this.y + this.bbox.bottom;
    }
}
export class Orb extends ObjectEntity{
    constructor(x = 0, y = 0, type = 0) {
        super(x,y);
        this.type = type;
        this.renderer = new Renderers.OrbRenderer(type);
        this.setBbox(-this.renderer.w/2, -this.renderer.h/2, this.renderer.w/2, this.renderer.h/2);
    }
}