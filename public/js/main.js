import { RenderManager } from "./renderManager.js";
import { InputManager } from "./inputManager.js"
import { Orb } from './objects.js'

const setup = function() {
    const surface = document.getElementById('main_surface');
    const renderManager = new RenderManager(surface);
    const inputManager = new InputManager(surface);
    const objectList = [];

    const orbTypeN = 8;
    const orbGrid = (new Array(10)).fill(0).map((row, x) => {
        return (new Array(10)).fill(0).map((col, y) => {
            const orb = new Orb(20 + 26*x, 20 + 26*y, Math.floor(Math.random() * orbTypeN));
            renderManager.add(orb, 0);
            return orb;
        });
    });
    objectList.push(orbGrid);

    renderManager.start(60);

    const collectObjectsAt = function(list, x, y) {
        return list.flat(3).filter(obj => obj.isAtPos(x,y));
    };
    inputManager.onClick((x,y) => {
        const clicked = collectObjectsAt(objectList, x, y);
        clicked.forEach(obj => {
            obj.renderer.visible = !obj.renderer.visible;
        });
    });
}
document.addEventListener('DOMContentLoaded', setup);