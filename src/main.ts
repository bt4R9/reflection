import { Entity } from "./Entity";
import { Entry } from "./Entry";
import { Vector } from "./Vector";

const node = document.getElementById('app') as HTMLCanvasElement;

if (!node) {
  throw new Error('No canvas element found');
}

const game = new Entry(node);
const world = game.world;

world
  .add(Entity.line(new Vector(1, 1), new Vector(799, 1)))
  .add(Entity.line(new Vector(1, 599), new Vector(799, 599)))
  .add(Entity.line(new Vector(1, 1), new Vector(1, 599)))
  .add(Entity.line(new Vector(799, 1), new Vector(799, 599)));

world
  .add(Entity.line(new Vector(40, 40), new Vector(300, 20)))
  .add(Entity.line(new Vector(300, 20), new Vector(500, 30)))
  .add(Entity.line(new Vector(500, 30), new Vector(750, 10)))
  .add(Entity.line(new Vector(750, 10), new Vector(790, 250)))
  .add(Entity.line(new Vector(790, 250), new Vector(750, 300)))
  .add(Entity.line(new Vector(750, 300), new Vector(790, 350)))
  .add(Entity.line(new Vector(790, 350), new Vector(780, 590)))
  .add(Entity.line(new Vector(780, 590), new Vector(600, 550)))
  .add(Entity.line(new Vector(600, 550), new Vector(400, 560)))
  .add(Entity.line(new Vector(400, 560), new Vector(200, 595)))
  .add(Entity.line(new Vector(200, 595), new Vector(190, 500)))
  .add(Entity.line(new Vector(190, 500), new Vector(150, 595)))
  .add(Entity.line(new Vector(150, 595), new Vector(30, 490)))
  .add(Entity.line(new Vector(30, 490), new Vector(50, 290)))
  .add(Entity.line(new Vector(50, 290), new Vector(10, 140)))
  .add(Entity.line(new Vector(10, 140), new Vector(40, 40)));

const sq1 = Entity.square(new Vector(250, 250), 75);
const sq2 = Entity.square(new Vector(450, 450), 90);
const sq3 = Entity.square(new Vector(550, 200), 90);

sq1.rotation = -0.01;
sq2.rotation = 0.02;
sq3.rotation = 0.005;

world
  .add(sq1)
  .add(sq2)
  .add(sq3);

const polygon = Entity.polygon([
  new Vector(100, 100),
  new Vector(150, 50),
  new Vector(50, 100),
]);

world.add(polygon);

game.start();