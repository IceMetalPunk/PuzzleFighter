import { RenderManager, Renderable, Sprite } from "./renderManager.js";

class Orb extends Renderable {
    constructor(x = 0, y = 0, type = 0) {
        super();
        this.x = x;
        this.y = y;
        this.type = type;
        this.sprite = new Sprite('../img/orbs.png', 0, type * 32, 32, 32, 4, 0.1);
    }
    draw(canv, ctx) {
        super.draw(canv, ctx);
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.translate(this.x + 0.5 - this.sprite.w/2, this.y + 0.5 - this.sprite.h/2);
        this.sprite.draw(canv, ctx);
        ctx.restore();
    }
}

const setup = function() {
    const renderManager = new RenderManager(document.getElementById('main_surface'));
    const orbTypeN = 8;
    const orbGrid = (new Array(10)).fill(0).map((row, x) => {
        return (new Array(10)).fill(0).map((col, y) => {
            const orb = new Orb(20 + 26*x, 20 + 26*y, Math.floor(Math.random() * orbTypeN));
            renderManager.add(orb, 0);
            return orb;
        });
    });
    renderManager.start(60);
}
document.addEventListener('DOMContentLoaded', setup);