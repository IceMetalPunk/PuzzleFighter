import { Renderable, Sprite } from "./renderManager.js";

export class OrbRenderer extends Renderable {
    constructor(type = 0) {
        super();
        this.type = type;
        this.sprite = new Sprite('../img/orbs.png', 0, type * 32, 32, 32, 4, 0.1);
        this.visible = true;
        this.w = 32;
        this.h = 32;
    }
    draw(canv, ctx, x = 0, y = 0) {
        super.draw(canv, ctx);
        if (this.visible) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.translate(x + 0.5 - this.sprite.w/2, y + 0.5 - this.sprite.h/2);
            this.sprite.draw(canv, ctx);
            ctx.restore();
        }
    }
}