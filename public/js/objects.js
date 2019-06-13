import * as Renderers from './renderers.js'

export class Orb {
    constructor(x = 0, y = 0, type = 0) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.renderer = new Renderers.OrbRenderer(type);
    }
    draw(canv, ctx) {
        this.renderer.draw(canv, ctx, this.x, this.y);
    }
}