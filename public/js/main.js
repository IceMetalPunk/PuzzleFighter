import { RenderManager } from "./renderManager.js";
import { InputManager } from "./inputManager.js"
import { Orb } from './objects.js'


const collectObjectsAt = function(list, x, y) {
  return list.flat(3).filter(obj => obj.isAtPos(x,y));
};

const floodFill = function(startingOrb, objectList, gridSpacing) {
  const group = [];
  const stack = [{orb: startingOrb, x: startingOrb.x, y: startingOrb.y}];
  const fillType = startingOrb.type;
  while (stack.length > 0) {
    const entry = stack.pop();
    group.push(entry.orb);
    const [xx, yy] = [entry.x, entry.y];
    for (let i = -1; i <= 1; ++i) {
      for (let j = -1; j <= 1; ++j) {
        if (i === j || (i !== 0 && j !== 0)) { continue; }
        const [tx, ty] = [xx + i * gridSpacing[0], yy + j * gridSpacing[1]];
        const check = collectObjectsAt(objectList, tx, ty);
        check.forEach(checkOrb => {
          if (checkOrb instanceof Orb && !group.includes(checkOrb) && checkOrb.type === fillType) {
            stack.push({orb: checkOrb, x: tx, y: ty});
          }
        });
      }
    }
  }
  return group;
};

const generateOrbGrid = function(gridSpacing, orbTypeN, renderManager) {
  return (new Array(10)).fill(0).map((row, x) => {
    return (new Array(10)).fill(0).map((col, y) => {
        const orb = new Orb(20 + gridSpacing[0] * x, 20 + gridSpacing[1] * y, Math.floor(Math.random() * orbTypeN));
        renderManager.add(orb, 0);
        return orb;
    });
});
}

const handleClick = function(x, y, objectList, gridSpacing) {
  const clicked = collectObjectsAt(objectList, x, y);
  if (clicked.length > 0 && clicked[0] instanceof Orb) {
    const group = floodFill(clicked[0], objectList, gridSpacing);
    group.forEach(orb => {
        orb.renderer.visible = !orb.renderer.visible;
    });
  }
};

const setup = function() {
    const surface = document.getElementById('main_surface');
    surface.addEventListener('contextmenu', ev => {
      ev.preventDefault();
      return false;
    });
    const renderManager = new RenderManager(surface);
    const inputManager = new InputManager(surface);
    const objectList = [];
    const gridSpacing = [26, 26];

    const orbTypeN = 8;
    const orbGrid = generateOrbGrid(gridSpacing, orbTypeN, renderManager);
    objectList.push(orbGrid);

    renderManager.start(60);

    inputManager.onClick((x ,y) => handleClick(x, y, objectList, gridSpacing));
}
document.addEventListener('DOMContentLoaded', setup);