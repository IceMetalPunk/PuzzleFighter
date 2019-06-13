export class Renderable {
    draw(canv, ctx) {};
};

export class Sprite extends Renderable {
    constructor(url, x, y, w, h, n, speed) {
        super();
        this.speed = speed;
        this.timer = 0;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.n = n;
        this.img = new Image();
        this.img.src = url;
    }
    draw(canv, ctx) {
        super.draw(canv, ctx);
        this.timer = (this.timer + this.speed) % this.n;
        const frame = Math.floor(this.timer);
        ctx.drawImage(this.img, this.x + this.w * frame, this.y, this.w, this.h, 0, 0, this.w, this.h);
    }
};

export class RenderManager {
    constructor(canv) {
        canv.width = canv.clientWidth;
        canv.height = canv.clientHeight;
        this.canvas = canv;
        this.ctx = canv.getContext('2d');
        this.timer = null;
        this.renderPipeline = [];   
    }
    start(fps = 30) {
        this.timer = self.setInterval(() => this.draw(), 1000/fps);
    }
    stop() {
        self.clearInterval(this.timer);
        this.timer = null;
    }
    setFps(fps = 30) {
        this.stop();
        this.start(fps);
    }
    add(renderable, depth = 0) {
        this.renderPipeline.push({
            renderable,
            depth
        });
        this.renderPipeline.sort((a,b) => {
            return a.depth - b.depth;
        });
    }
    remove(renderable) {
        this.renderPipeline = this.renderPipeline.filter(existing => existing.renderable !== renderable);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.w, this.canvas.h);
        this.renderPipeline.forEach(entry => entry.renderable.draw(this.canvas, this.ctx));
    }
};